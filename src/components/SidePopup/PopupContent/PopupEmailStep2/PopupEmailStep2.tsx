import InputBase from 'components/parts/InputBase/InputBase'
import { FC, useState } from 'react'

import styles from '../../SidePopup.module.scss'

interface IEmail {
  emailName: string
  emailOptions: IEmailOptions
}

interface IEmailOptions {
  theme: string | undefined
  preheader: string | undefined
}

const PopupEmailStep2: FC<IEmail> = ({ emailName, emailOptions }) => {
  const [emailData, setEmailData] = useState<IEmailOptions>(emailOptions)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target

    setEmailData({ ...emailData, [name]: value })
  }

  return (
    <div className={styles.popupContentInnerWrapper}>
      <div className={styles.popupSubtitle}>{emailName}</div>
      <InputBase
        label="Тема"
        name="theme"
        value={emailData.theme}
        handleInputChange={handleInputChange}
        modificator={styles.popupInput}
      />
      <InputBase
        label="Прехедер"
        name="preheader"
        value={emailData.preheader}
        handleInputChange={handleInputChange}
        modificator={styles.popupInput}
      />
    </div>
  )
}

export default PopupEmailStep2
