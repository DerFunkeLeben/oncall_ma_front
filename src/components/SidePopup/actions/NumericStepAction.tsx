import { FC, useEffect } from 'react'

import usePopupContext from 'context/SidePopupContext'
import NumericStep from 'components/parts/NumericStep/NumericStep'

interface INumericStepAction {
  preset?: { [key: string]: any }
}

const NumericStepAction: FC<INumericStepAction> = ({ preset }) => {
  const { action, settings, setSettings } = usePopupContext()

  const actionName = action.name
  const { title } = action

  const currentValue =
    settings && settings[actionName] && settings[actionName].amount
      ? settings[actionName].amount
      : 0

  const handleChange = (value: number | null) => {
    const newState = {
      ...settings,
      [actionName]: {
        ...(settings && settings[actionName]),
        ...preset,
        amount: (value || 0).toString(),
      },
    }
    setSettings(newState)
  }

  return (
    <NumericStep label={title} name={actionName} value={currentValue} handleChange={handleChange} />
  )
}

export default NumericStepAction
