import { FC, ChangeEvent, useState } from 'react'
import cx from 'classnames'

import InputBase from 'components/parts/InputBase/InputBase'
import FileDropZone from '../components/FileDropZone/FileDropZone'
import ContentPopup from '../components/ContentPopup/ContentPopup'
import ContentHead from '../components/ContentHead/ContentHead'
import HTMLTextArea from './parts/HTMLTextArea'
import HTMLPreview from './parts/HTMLPreview'

import useCurrentContent from 'store/content/useCurrentContent'
import useDebounce from 'hooks/useDebounce'
import useToggle from 'hooks/useToggle'
import { INIT_HTML_CONTENT } from 'constants/content'

import { IPageData } from 'types'
import { IContentHTML } from 'types/content'
import styles from './ContentHTML.module.scss'
import { postAxiosSingle } from 'utils/axios'
import { SEND_EMAIL_URL } from 'constants/url'
import useAlertContext from 'context/AlertContext'
import { AlertBoxIcons } from 'constants/dictionary'

const ContentHTML: FC<IPageData> = () => {
  const { currentContent } = useCurrentContent()
  const { setAlertBox } = useAlertContext()

  const [popUpIsOpen, togglePopUp] = useToggle()
  const [emails, setEmails] = useState<string[]>([''])

  const [settings, setSettings] = useState<IContentHTML>(
    (currentContent.content as IContentHTML) || INIT_HTML_CONTENT
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setSettings({
      ...settings,
      [name]: value,
    })
  }

  const showTextArea = settings.HTML != undefined

  const handleDropHTML = (acceptedFiles: Array<File>) => {
    const file = acceptedFiles[0]
    const reader = new FileReader()

    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      const result = reader.result?.toString()
      setSettings((prevState) => {
        return {
          ...prevState,
          HTML: result,
        }
      })
    }
    reader.readAsText(file)
  }

  const sendEmails = async (inputs: string[]) => {
    const sendData = {
      html: settings.HTML,
      header: settings.preheader,
      title: settings.theme,
      emails: inputs,
    }
    await postAxiosSingle(SEND_EMAIL_URL, {}, sendData)
    setAlertBox({
      message: `Письмо успешно отправлено!`,
      icon: AlertBoxIcons.SUCCESS,
      isOpen: true,
    })
    togglePopUp()
  }

  const debouncedHTML = useDebounce(settings.HTML, 1000)

  return (
    <div className={cx(styles.pageContent)}>
      <ContentHead settings={settings} handleChange={handleChange} openPopUp={togglePopUp} />

      {showTextArea ? (
        <HTMLTextArea HTML={settings.HTML} handleChange={handleChange} />
      ) : (
        <FileDropZone handleDropFile={handleDropHTML} />
      )}

      <div className={cx(styles.rightContent)}>
        <InputBase
          label={'Тема'}
          name={'theme'}
          placeholder={'Введите текст'}
          value={settings.theme}
          handleInputChange={handleChange}
          modificator={styles.input}
          type={'text'}
        />
        <InputBase
          label={'Прехедер'}
          name={'preheader'}
          placeholder={'Введите текст'}
          value={settings.preheader}
          handleInputChange={handleChange}
          modificator={styles.input}
          type={'text'}
        />
        <HTMLPreview HTML={debouncedHTML} />
      </div>

      {popUpIsOpen && (
        <ContentPopup
          close={togglePopUp}
          subtitle="Email"
          placeholder="Введите email"
          btnAddText="Добавить email"
          inputsState={emails}
          setInputsState={setEmails}
          handleSend={sendEmails}
        />
      )}
    </div>
  )
}

export default ContentHTML
