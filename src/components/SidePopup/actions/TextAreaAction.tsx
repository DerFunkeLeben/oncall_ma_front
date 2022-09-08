import { FC, ChangeEvent, useEffect } from 'react'

import usePopupContext from 'context/SidePopupContext'
import TextArea from 'components/parts/TextArea/TextArea'
import styles from '../SidePopup.module.scss'

const TextAreaAction: FC = () => {
  const { action, currentSettings, setTempSettings } = usePopupContext()
  const actionName = action.name
  const subtitle = action.subtitle
  const label = action.label
  const initText = action.text

  const text = currentSettings[actionName]?.text || initText

  useEffect(() => {
    if (initText) {
      const newState = {
        ...currentSettings,
        [actionName]: {
          ...currentSettings[actionName],
          text: initText,
        },
      }
      setTempSettings(newState)
    }
  }, [])

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target
    const newState = {
      ...currentSettings,
      [actionName]: {
        ...currentSettings[actionName],
        text: value,
      },
    }
    setTempSettings(newState)
  }

  return (
    <div>
      <div className={styles.popupSubtitle}>{subtitle}</div>
      <TextArea
        label={label}
        name={actionName}
        value={text}
        onChange={handleChange}
        modificator={styles.popupTextArea}
      />
    </div>
  )
}

export default TextAreaAction
