import { FC } from 'react'

import usePopupContext from 'context/SidePopupContext'
import RadioGroup from 'components/parts/RadioGroup/RadioGroup'

const RadioGroupAction: FC = () => {
  const { action, currentState, setState } = usePopupContext()
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
