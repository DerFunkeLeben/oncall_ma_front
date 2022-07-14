import { FC } from 'react'
import DatePick from 'react-datepicker'
import ru from 'date-fns/locale/ru'

import DateInput from './DateInput'
import TimeInput from './TimeInput'

import 'react-datepicker/dist/react-datepicker.css'
import './styles.scss'
import styles from './DatePicker.module.scss'

const dateFormat = 'd MMMM yyyy p'

interface IDatePicker {
  value?: Date
  label?: string
  handleDateChange: (date: Date) => void
  modificator?: string | string[]
}

const DatePicker: FC<IDatePicker> = ({ value, handleDateChange, label = 'Выбор даты' }) => {
  const valueFormatted = value ? new Date(value) : new Date()

  const labelTime = 'Время старта'

  return (
    <div>
      <DatePick
        calendarClassName={styles.calendarWrapper}
        selected={valueFormatted}
        onChange={handleDateChange}
        portalId="root-popups"
        showPopperArrow={false}
        dateFormat={dateFormat}
        locale={ru}
        timeFormat="p"
        timeInputLabel={labelTime}
        showTimeInput
        customTimeInput={
          <TimeInput
            value={valueFormatted}
            onChange={handleDateChange}
            onClick={() => console.log(1)}
          />
        }
        customInput={
          <DateInput
            value={valueFormatted}
            label={label}
            onChange={console.log}
            onClick={console.log}
          />
        }
      />
    </div>
  )
}

export default DatePicker
