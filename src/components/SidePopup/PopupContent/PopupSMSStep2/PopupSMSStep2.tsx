import TextArea from 'components/parts/TextArea/TextArea'
import { FC, useState } from 'react'

import styles from '../../SidePopup.module.scss'

interface ISMS {
  SMSName: string
  SMSOptions: ISMSOptions
}

interface ISMSOptions {
  text: string | undefined
}

const PopupSMSStep2: FC<ISMS> = ({ SMSName, SMSOptions }) => {
  const [SMSData, setSMSData] = useState<ISMSOptions>(SMSOptions)

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = event.target

    setSMSData({ ...SMSData, [name]: value })
  }

  return (
    <div className={styles.popupContentInnerWrapper}>
      <div className={styles.popupSubtitle}>{SMSName}</div>
      <TextArea
        label="Текст"
        name="text"
        value={SMSData.text}
        onChange={handleChange}
        modificator={styles.popupTextArea}
      />
    </div>
  )
}

export default PopupSMSStep2
