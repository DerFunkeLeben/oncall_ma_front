import { FC, ChangeEvent, useState } from 'react'
import { useParams } from 'react-router-dom'
import cx from 'classnames'

import InputBase from 'components/parts/InputBase/InputBase'
import FileDropZone from '../components/FileDropZone/FileDropZone'
import ContentPopup from '../components/ContentPopup/ContentPopup'
import ContentHead from '../components/ContentHead/ContentHead'
import HTMLTextArea from './parts/HTMLTextArea'
import HTMLPreview from './parts/HTMLPreview'

import useDebounce from 'hooks/useDebounce'
import { getContentById } from 'utils/content'
import { getToday } from 'utils/transformDate'

import { data } from '../AllContent/allContentData'

import { IPageData } from 'types'
import { IContentHTML, ContentTypes } from 'types/content'

import styles from './ContentHTML.module.scss'

const defaultContent = {
  title: `Письмо ${getToday()}`,
  type: ContentTypes.HTML,
  theme: '',
  preheader: '',
  HTML: undefined,
}

const ContentHTML: FC<IPageData> = () => {
  const { contentId } = useParams<{ contentId?: string }>()
  const existingContent = (getContentById(data, contentId) as IContentHTML) || defaultContent
  const [popUpIsOpen, setPopUpIsOpen] = useState<boolean>(false)
  const [emails, setEmails] = useState<string[]>([''])

  const [settings, setSettings] = useState<IContentHTML>(existingContent)

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

  const togglePopUp = () => setPopUpIsOpen(!popUpIsOpen)

  const sendEmails = (inputs: string[]) => {
    console.log('send email', inputs)
    togglePopUp()
  }

  const debouncedHTML = useDebounce(settings.HTML, 1000)

  return (
    <div className={cx(styles.pageContent)}>
      <ContentHead title={settings.title} handleChange={handleChange} openPopUp={togglePopUp} />

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
