import TextArea from 'components/parts/TextArea/TextArea'
import { FC, ChangeEvent, Dispatch, SetStateAction } from 'react'

import { IAction, IState } from 'types/sidePopup'

interface ITextAreaAction {
  currentStep: number
  action: IAction
  currentState: IState
  setState: Dispatch<SetStateAction<IState>> /* TODO хуйня какая то */
}

const TextAreaAction: FC<ITextAreaAction> = ({ currentStep, action, currentState, setState }) => {
  const actionName = action.name

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = event.target
    const stepNumber = currentStep - 1
    const newState = {
      ...currentState,
      [stepNumber]: {
        ...currentState[stepNumber],
        [name]: value,
      },
    }
    setState(newState)
  }

  return (
    <div key={actionName}>
      <TextArea label={'text'} name={actionName} onChange={handleChange} />
    </div>
  )
}

export default TextAreaAction
