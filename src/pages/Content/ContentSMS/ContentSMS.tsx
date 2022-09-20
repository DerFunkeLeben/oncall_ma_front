import { FC, ChangeEvent, useState } from 'react'
import cx from 'classnames'

import TextArea from 'components/parts/TextArea/TextArea'
import ContentHead from '../components/ContentHead/ContentHead'
import ContentPopup from '../components/ContentPopup/ContentPopup'

import useToggle from 'hooks/useToggle'
import useCurrentContent from 'store/content/useCurrentContent'
import { INIT_SMS_CONTENT } from 'constants/content'

import { IPageData } from 'types'
import { IContentSMS } from 'types/content'
import styles from './ContentSMS.module.scss'

const ContentHTML: FC<IPageData> = () => {
  const { currentContent } = useCurrentContent()

  const [popUpIsOpen, togglePopUp] = useToggle()
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([''])

  const [settings, setSettings] = useState<IContentSMS>(
    (currentContent.content as IContentSMS) || INIT_SMS_CONTENT
  )

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setSettings({
      ...settings,
      [name]: value,
    })
  }

  const sendSMS = (inputs: string[]) => {
    console.log('send sms', inputs)
    togglePopUp()
  }

  return (
    <div className={cx(styles.pageContent)}>
      <ContentHead
        settings={settings}
        handleChange={handleChange}
        openPopUp={togglePopUp}
        handleSave={() => 'save'}
      />

      <TextArea
        label="Текст письма"
        placeholder={'Введите текст'}
        modificator={cx(styles.textArea)}
        value={settings.SMStext}
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
