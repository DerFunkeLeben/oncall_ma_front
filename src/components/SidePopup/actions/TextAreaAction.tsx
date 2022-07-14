import { FC, ChangeEvent } from 'react'

import usePopupContext from 'context/SidePopupContext'
import TextArea from 'components/parts/TextArea/TextArea'
import styles from '../SidePopup.module.scss'

interface ITextAreaAction {
  subtitle: string
  label?: string
}

const TextAreaAction: FC<ITextAreaAction> = ({ subtitle, label = 'Текст' }) => {
  const { action, currentState, setState } = usePopupContext()
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
