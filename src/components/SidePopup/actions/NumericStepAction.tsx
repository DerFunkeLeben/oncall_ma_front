import { FC, useEffect } from 'react'

import usePopupContext from 'context/SidePopupContext'
import NumericStep from 'components/parts/NumericStep/NumericStep'

interface INumericStepAction {
  preset?: { [key: string]: any }
}

const NumericStepAction: FC<INumericStepAction> = ({ preset }) => {
  const { action, currentState, setState } = usePopupContext()

  const actionName = action.name
  const { title } = action

  let numValue = 0
  if (currentState[actionName]?.amount) {
    numValue = Number(currentState[actionName]?.amount)
  }

  const handleChange = (value: number | null) => {
    const newState = {
      ...currentState,
      [actionName]: {
        ...currentState[actionName],
        ...preset,
        amount: (value || 0).toString(),
      },
    }
    console.log('handleChange', currentState, preset, value)
    setState(newState)
  }

  useEffect(() => {
    const presetAmount = preset?.amount

    const result = presetAmount || 0
    handleChange(result)
  }, [])

  return (
    <NumericStep label={title} name={actionName} value={numValue} handleChange={handleChange} />
  )
}

export default NumericStepAction
