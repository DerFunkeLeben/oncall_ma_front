import { FC, Dispatch, SetStateAction } from 'react'

import RadioGroup from 'components/parts/RadioGroup/RadioGroup'

import { IActionRadio, IState } from 'types/sidePopup'

interface IRadioGroupAction {
  currentState: IState
  action: IActionRadio
  setState: Dispatch<SetStateAction<IState>> /* TODO хуйня какая то */
}

const RadioGroupAction: FC<IRadioGroupAction> = ({ action, currentState, setState }) => {
  const actionName = action.name
  const options = action.options
  const pickedOptionName = currentState[actionName]

  const handleChange = (value: string) => {
    const newState = {
      ...currentState,
      [actionName]: value,
    }
    setState(newState)
  }

  return <RadioGroup options={options} value={pickedOptionName} handleChange={handleChange} />
}

export default RadioGroupAction
