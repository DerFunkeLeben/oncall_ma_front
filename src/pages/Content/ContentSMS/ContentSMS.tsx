import { FC, ChangeEvent, useState } from 'react'
import { useParams } from 'react-router-dom'
import cx from 'classnames'

import TextArea from 'components/parts/TextArea/TextArea'
import ContentHead from '../components/ContentHead/ContentHead'
import ContentPopup from '../components/ContentPopup/ContentPopup'

import { getContentById } from 'utils/content'
import { getToday } from 'utils/transformDate'

import { data } from '../AllContent/allContentData'

import { IPageData } from 'types'
import { IContentSMS, ContentTypes } from 'types/content'

import styles from './ContentSMS.module.scss'

const defaultContent = {
  title: `SMS ${getToday()}`,
  type: ContentTypes.SMS,
  text: '',
}

const ContentHTML: FC<IPageData> = () => {
  const { contentId } = useParams<{ contentId?: string }>()
  const existingContent = (getContentById(data, contentId) as IContentSMS) || defaultContent

  const [popUpIsOpen, setPopUpIsOpen] = useState<boolean>(false)
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([''])

  const [settings, setSettings] = useState<IContentSMS>(existingContent)

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setSettings({
      ...settings,
      [name]: value,
    })
  }

  const togglePopUp = () => setPopUpIsOpen(!popUpIsOpen)

  const sendSMS = (inputs: string[]) => {
    console.log('send sms', inputs)
    togglePopUp()
  }

  return (
    <div className={cx(styles.pageContent)}>
      <ContentHead title={settings.title} handleChange={handleChange} openPopUp={togglePopUp} />

      <TextArea
        label="Текст письма"
        placeholder={'Введите текст'}
        modificator={cx(styles.textArea)}
        value={settings.text}
        onChange={handleChange}
        name="text"
        spellCheck={false}
      />

      {popUpIsOpen && (
        <ContentPopup
          close={togglePopUp}
          subtitle="Номер телефона"
          placeholder="Введите номер телефона"
          btnAddText="Добавить номер телефона"
          inputsState={phoneNumbers}
          setInputsState={setPhoneNumbers}
          handleSend={sendSMS}
        />
      )}
    </div>
  )
}

export default ContentHTML
