import { FC, Dispatch, SetStateAction } from 'react'

import RadioGroup from 'components/parts/RadioGroup/RadioGroup'

import { IAction } from 'types/sidePopup'
import { IRadioOptions } from 'components/parts/RadioGroup/RadioGroup'
import { IState } from 'pages/Audiences/OneAudience/OneAudience' // перенести типы

interface IRadioGroupAction {
  options: IRadioOptions
  currentState: IState
  action: IAction
  setState: Dispatch<SetStateAction<IState>> /* TODO хуйня какая то */
}

const RadioGroupAction: FC<IRadioGroupAction> = ({ action, currentState, setState, options }) => {
  const actionName = action.name
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
