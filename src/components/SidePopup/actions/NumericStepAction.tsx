import { FC } from 'react'

import usePopupContext from 'context/SidePopupContext'
import NumericStep from 'components/parts/NumericStep/NumericStep'

const NumericStepAction: FC = () => {
  const { action, currentState, setState } = usePopupContext()

  const actionName = action.name
  const { title } = action
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
    <NumericStep label={title} name={actionName} value={numValue} handleChange={handleChange} />
  )
}

export default NumericStepAction
