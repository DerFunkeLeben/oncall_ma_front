import React, { FC, useState } from 'react'
import DatePick from 'react-datepicker'
import ru from 'date-fns/locale/ru'

import 'react-datepicker/dist/react-datepicker.css'
import './styles.scss'
import styles from './DatePicker.module.scss'

const ExampleCustomTimeInput = () => <input value={'11:00'} style={{ border: 'solid 1px pink' }} />

const dateFormat = 'd MMMM yyyy h:mm'

const DatePicker: FC = () => {
  const [startDate, setStartDate] = useState(new Date('07-11-2022'))

  return (
    <div>
      <DatePick
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        portalId="root-popups"
        calendarClassName={styles.calendarWrapper}
        showPopperArrow={false}
        dateFormat={dateFormat}
        locale={ru}

        // showTimeSelect
        // customTimeInput={<ExampleCustomTimeInput />}
        //customInput={<CustomInput />}
      />
    </div>
  )
}

export default DatePicker
