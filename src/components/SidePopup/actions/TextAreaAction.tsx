import { FC, ChangeEvent, Dispatch, SetStateAction } from 'react'

import TextArea from 'components/parts/TextArea/TextArea'

import { IAction, IState } from 'types/sidePopup'

import styles from '../SidePopup.module.scss'

interface ITextAreaAction {
  subtitle: string
  action: IAction
  currentState: IState
  setState: Dispatch<SetStateAction<IState>> /* TODO хуйня какая то */
  label?: string
}

const TextAreaAction: FC<ITextAreaAction> = ({
  currentState,
  setState,
  subtitle,
  action,
  label = 'Текст',
}) => {
  const actionName = action.name
  const text = currentState[actionName] || ''

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target
    const newState = {
      ...currentState,
      [actionName]: value,
    }
    setState(newState)
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
