import { FC, ChangeEvent, useEffect } from 'react'

import usePopupContext from 'context/SidePopupContext'
import TextArea from 'components/parts/TextArea/TextArea'
import styles from '../SidePopup.module.scss'
import { useSidePopup } from 'store/sidePopupStore/useSidePopup'
import { IAction } from 'types/sidePopup'

const TextAreaAction: FC<IAction> = ({ settingName, applySettings }) => {
  const { step, tempSettings, setTempSettings, savedSettings } = usePopupContext()
  const { updateTempSettings } = useSidePopup()
  const actionName = step.name
  const subtitle = step.subtitle
  const label = step.label

  const text = tempSettings?.[actionName]?.[settingName]
    ? tempSettings[actionName][settingName]
    : ''

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target
    applySettings(value, tempSettings, updateTempSettings)
  }

  return (
    <div>
      <div className={styles.popupSubtitle}>{label}</div>
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
