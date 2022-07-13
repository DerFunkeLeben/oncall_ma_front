import { FC, ChangeEvent, Dispatch, SetStateAction } from 'react'

import InputBase from 'components/parts/InputBase/InputBase'

import { IAction, IStatePopup } from 'types/sidePopup'

import styles from '../SidePopup.module.scss'

interface IInputAction {
  currentState: IStatePopup
  action: IAction
  setState: Dispatch<SetStateAction<IStatePopup>>
  label?: string
  id?: string
  type?: string
}

const InputAction: FC<IInputAction> = ({
  action,
  currentState,
  setState,
  label,
  type,
  id = 'text',
}) => {
  const actionName = action.name
  const text = currentState[actionName]?.[id] || ''

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    const newState = {
      ...currentState,
      [actionName]: {
        ...currentState[actionName],
        [id]: value,
      },
    }
    setState(newState)
  }

  return (
    <InputBase
      label={label}
      name={actionName}
      value={text}
      handleInputChange={handleChange}
      modificator={styles.popupInput}
      type={type || 'text'}
    />
  )
}

export default InputAction
