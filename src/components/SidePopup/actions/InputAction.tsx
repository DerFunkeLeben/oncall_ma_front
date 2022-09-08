import { FC, ChangeEvent } from 'react'

import usePopupContext from 'context/SidePopupContext'
import InputBase from 'components/parts/InputBase/InputBase'
import styles from '../SidePopup.module.scss'

interface IInputAction {
  stateKey?: string
  type?: string
  label?: string
}

const InputAction: FC<IInputAction> = ({ type, stateKey = 'text', label }) => {
  const { action, currentState, setState, settings, setSettings } = usePopupContext()

  const actionName = action.name

  const currentValue =
    settings && settings[actionName] && settings[actionName][stateKey]
      ? settings[actionName][stateKey]
      : ''

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    const newState = {
      ...currentState,
      [actionName]: {
        ...(settings && settings[actionName]),
        [stateKey]: value,
      },
    }
    setSettings(newState)
  }

  return (
    <InputBase
      label={label}
      name={actionName}
      value={currentValue}
      handleInputChange={handleChange}
      modificator={styles.popupInput}
      type={type || 'text'}
    />
  )
}

export default InputAction
