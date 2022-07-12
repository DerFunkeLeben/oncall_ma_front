import { FC, ChangeEvent, Dispatch, SetStateAction } from 'react'

import TextArea from 'components/parts/TextArea/TextArea'

import { IAction, IStatePopup } from 'types/sidePopup'

import styles from '../SidePopup.module.scss'

interface ITextAreaAction {
  subtitle: string
  action: IAction
  currentState: IStatePopup
  setState: Dispatch<SetStateAction<IStatePopup>> /* TODO хуйня какая то */
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
  const text = currentState[actionName]?.text || ''

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target
    const newState = {
      ...currentState,
      [actionName]: {
        ...currentState[actionName],
        text: value,
      },
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
