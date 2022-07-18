import { FC, ChangeEvent } from 'react'

import usePopupContext from 'context/SidePopupContext'
import InputBase from 'components/parts/InputBase/InputBase'
import styles from '../SidePopup.module.scss'

interface IInputAction {
  stateKey?: string
  type?: string
}

const InputAction: FC<IInputAction> = ({ type, stateKey = 'text' }) => {
  const { action, currentState, setState } = usePopupContext()

  const actionName = action.name
  const { title } = action
  const text = currentState[actionName]?.[stateKey] || ''

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    const newState = {
      ...currentState,
      [actionName]: {
        ...currentState[actionName],
        [stateKey]: value,
      },
    }
    setState(newState)
  }

  return (
    <InputBase
      label={title}
      name={actionName}
      value={text}
      handleInputChange={handleChange}
      modificator={styles.popupInput}
      type={type || 'text'}
    />
  )
}

export default InputAction
