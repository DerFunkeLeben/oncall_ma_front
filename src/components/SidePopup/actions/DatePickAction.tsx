import { FC } from 'react'

import usePopupContext from 'context/SidePopupContext'
import DatePicker from 'components/parts/DatePicker/DatePicker'

const DatePickAction: FC = () => {
  const { action, currentState, setState } = usePopupContext()

  const actionName = action.name
  const { title } = action
  const storedValue = currentState[actionName]?.date || ''

  const handleChange = (date: Date) => {
    const newState = {
      ...currentState,
      [actionName]: {
        ...currentState[actionName],
        date: date.toString(),
      },
    }
    setState(newState)
  }

  return <DatePicker label={title} value={storedValue} handleDateChange={handleChange} />
}

export default DatePickAction
