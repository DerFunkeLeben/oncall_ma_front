import { FC, ChangeEvent, useState, useEffect } from 'react'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import cx from 'classnames'

import InputBase from 'components/parts/InputBase/InputBase'
import FileDropZone from '../components/FileDropZone/FileDropZone'
import ContentPopup from '../components/ContentPopup/ContentPopup'
import ContentHead from '../components/ContentHead/ContentHead'
import HTMLTextArea from './parts/HTMLTextArea'
import HTMLPreview from './parts/HTMLPreview'

import useAuth from 'store/auth/useAuth'
import useDebounce from 'hooks/useDebounce'
import useToggle from 'hooks/useToggle'
import useAlertContext from 'context/AlertContext'
import { useContentFolders } from 'store/folders/useAllFolders'
import { INIT_HTML_CONTENT } from 'constants/content'
import { AlertBoxIcons } from 'constants/dictionary'
import { PagesData } from 'constants/url'

import { IPageData } from 'types'
import { IContent } from 'types/content'
import {
  getContentHTML,
  sendContentHTML,
  updateContentHTML,
  uploadContentHTML,
} from 'utils/axiosQueries/content'
import styles from './ContentHTML.module.scss'
import { useSendHTMLPopup } from './useSendHTMLPopup'

const ContentHTML: FC<IPageData> = () => {
  const { contentId } = useParams<{ contentId?: string }>()
  const history = useHistory()
  const location = useLocation()

  const { popUpIsOpen, emails, setEmails, togglePopUp, sendEmails } = useSendHTMLPopup()
  const { activeFolderName } = useContentFolders()
  const { setAlertBox } = useAlertContext()
  // const { setMessageBox } = useMessageBoxContext()

  const [settings, setSettings] = useState<IContent>(INIT_HTML_CONTENT)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)

  const isNew = location.pathname === PagesData.CONTENT_HTML.link
  const showTextArea = settings.HTML != undefined

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setSettings({
      ...settings,
      [name]: value,
    })
  }

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

  const handleSave = async () => {
    // const notCurrentContentTitle = titleAlreadyExists?.id !== currentContent.content?.id
    // const needMessageBox = titleAlreadyExists && notCurrentContentTitle
    // if (needMessageBox)
    //   return setMessageBox({
    //     isOpen: true,
    //     title: ValidationError.FILE_ALREADY_EXISTS,
    //     buttons: ['Ок'],
    //   })

    if (isNew) {
      await uploadContentHTML(settings, activeFolderName, setAlertBox)
      // TODO получать айди созданного контента из функции, и переходить по нему
      history.push(PagesData.ALL_CONTENT.link)
    } else {
      await updateContentHTML(settings, activeFolderName, setAlertBox)
    }
  }

  const debouncedHTML = useDebounce(settings.HTML, 1000)

  useEffect(() => {
    if (!isNew) {
      const loadPromise = getContentHTML(contentId, setSettings)
      loadPromise.then(() => setIsLoaded(true))
    } else setIsLoaded(true)
  }, [])

  return (
    <div className={cx(styles.pageContent)}>
      <ContentHead
        settings={settings}
        handleChange={handleChange}
        openPopUp={togglePopUp}
        handleSave={handleSave}
        isLoaded={isLoaded}
      />

      {showTextArea ? (
        <HTMLTextArea HTML={settings.HTML} handleChange={handleChange} />
      ) : (
        <FileDropZone handleDropFile={handleDropHTML} />
      )}

      <div className={cx(styles.rightContent)}>
        <InputBase
          label={'Тема'}
          name={'subject'}
          placeholder={'Введите текст'}
          value={settings.subject}
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
          handleSend={() => sendEmails(settings)}
        />
      )}
    </div>
  )
}

export default ContentHTML
