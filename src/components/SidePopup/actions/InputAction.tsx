import { FC, ChangeEvent } from 'react'

import usePopupContext from 'context/SidePopupContext'
import InputBase from 'components/parts/InputBase/InputBase'
import styles from '../SidePopup.module.scss'
import { IAction } from 'types/sidePopup'
import { useSidePopup } from 'store/sidePopupStore/useSidePopup'

const InputAction: FC<IAction> = ({ settingName, label, applySettings }) => {
  const { step, currentState, tempSettings, setSettings } = usePopupContext()
  const { updateTempSettings } = useSidePopup()

  const actionName = step.name

  const currentValue =
    tempSettings && tempSettings[actionName] && tempSettings[actionName][settingName]
      ? tempSettings[actionName][settingName]
      : ''

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    applySettings(value, tempSettings, updateTempSettings)
  }

  return (
    <InputBase
      label={label}
      name={actionName}
      value={currentValue}
      handleInputChange={handleChange}
      modificator={styles.popupInput}
      type={'text'}
    />
  )
}

export default InputAction
