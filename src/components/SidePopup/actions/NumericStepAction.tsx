import { FC, Dispatch, SetStateAction } from 'react'

import NumericStep from 'components/parts/NumericStep/NumericStep'

import { IAction, IStatePopup } from 'types/sidePopup'

interface INumericStepAction {
  currentState: IStatePopup
  action: IAction
  setState: Dispatch<SetStateAction<IStatePopup>>
  label?: string
}

const NumericStepAction: FC<INumericStepAction> = ({ action, currentState, setState, label }) => {
  const actionName = action.name
  const numValue = +(currentState[actionName]?.ammount || 0)

  const handleChange = (value: number | null) => {
    const newState = {
      ...currentState,
      [actionName]: {
        ...currentState[actionName],
        ammount: (value || 0).toString(),
      },
    }
    setState(newState)
  }

  return (
    <NumericStep label={label} name={actionName} value={numValue} handleChange={handleChange} />
  )
}

export default NumericStepAction
