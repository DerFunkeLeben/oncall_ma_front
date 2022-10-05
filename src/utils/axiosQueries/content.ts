import { AlertBoxIcons } from 'constants/dictionary'
import {
  CONTENT_URL_ONE,
  CONTENT_URL_UPDATE,
  CONTENT_URL_UPLOAD,
  SEND_EMAIL_URL,
} from 'constants/url'
import { Dispatch, SetStateAction } from 'react'
import { IAlertBox } from 'types'
import { ContentTypes, IContent } from 'types/content'
import { decodeFileName } from 'utils'
import { getAxiosSingle, postAxiosFormData, postAxiosSingle, putAxiosSingle } from 'utils/axios'

const getContentHTML = async (
  contentId: string | undefined,
  setSettings?: Dispatch<SetStateAction<IContent>>
) => {
  if (!contentId) return
  const content = await getAxiosSingle(`${CONTENT_URL_ONE}/${contentId}`)
  const { id, title, preheader, originalName, group } = content.file
  const settings = {
    id,
    type: ContentTypes.HTML,
    title: decodeFileName(originalName),
    folderName: group,
    subject: title,
    preheader: preheader,
    HTML: content.data,
  }
  setSettings?.(settings)
  return settings
}

const uploadContentHTML = async (
  settings: IContent,
  activeFolderName: string,
  setAlertBox: Dispatch<SetStateAction<IAlertBox>>
) => {
  const formData = new FormData()
  const { HTML, subject, title, preheader } = settings
  const text = HTML || ''
  const fileName = `${encodeURIComponent(title)}.html`
  const blob = new Blob([text], { type: 'text/plain' })
  const file = new File([blob], fileName, { type: 'text/plain' })

  formData.append('file', file)
  formData.append('type', 'email')
  formData.append('title', subject || '')
  formData.append('preheader', preheader || '')
  formData.append('group', activeFolderName)

  const result = await postAxiosFormData(CONTENT_URL_UPLOAD, {}, formData)

  setAlertBox({
    message: `Контент успешно загружен!`,
    icon: AlertBoxIcons.SUCCESS,
    isOpen: true,
  })
  console.log(result)
}

const updateContentHTML = async (
  settings: IContent,
  activeFolderName: string,
  setAlertBox: Dispatch<SetStateAction<IAlertBox>>
) => {
  // TODO: не обновляется имя файла, нужно добавить поле
  const { id, HTML, preheader, subject } = settings
  const data = {
    id,
    html: HTML || '',
    title: subject,
    preheader,
    group: activeFolderName,
  }
  const result = await putAxiosSingle(CONTENT_URL_UPDATE, {}, data)
  console.log(result)

  setAlertBox({
    message: `Контент успешно обновлен!`,
    icon: AlertBoxIcons.SUCCESS,
    isOpen: true,
  })
}

const sendContentHTML = async (settings: IContent, inputs: string[]) => {
  const sendData = {
    html: settings.HTML,
    header: settings.preheader,
    title: settings.subject,
    emails: inputs,
  }
  await postAxiosSingle(SEND_EMAIL_URL, {}, sendData)
}

export { getContentHTML, uploadContentHTML, updateContentHTML, sendContentHTML }
