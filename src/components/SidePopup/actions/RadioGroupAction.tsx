import { FC, Dispatch, SetStateAction } from 'react'

import RadioGroup from 'components/parts/RadioGroup/RadioGroup'

import { IActionRadio, IStatePopup } from 'types/sidePopup'

interface IRadioGroupAction {
  currentState: IStatePopup
  action: IActionRadio
  setState: Dispatch<SetStateAction<IStatePopup>> /* TODO хуйня какая то */
}

const RadioGroupAction: FC<IRadioGroupAction> = ({ action, currentState, setState }) => {
  const actionName = action.name
  const options = action.options
  const pickedOptionName = currentState[actionName]?.option

  const handleChange = (value: string) => {
    const newState = {
      ...currentState,
      [actionName]: {
        ...currentState[actionName],
        option: value,
      },
    }
    setState(newState)
  }

  return <RadioGroup options={options} value={pickedOptionName} handleChange={handleChange} />
}

export default RadioGroupAction
