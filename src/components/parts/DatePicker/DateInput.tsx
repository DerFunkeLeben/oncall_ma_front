import { FC, forwardRef } from 'react'

import { IconCalendar } from 'assets/icons'
import InputBase from '../InputBase/InputBase'

import styles from './DatePicker.module.scss'

interface IDateInput {
  value: any
  onClick: any
  onChange: any
  label?: string
  placeholder?: string
  error?: string
  modificator?: string
}

const DateInput: FC<IDateInput> = forwardRef(
  ({ value, onClick, onChange, label, modificator = '' }: IDateInput, ref: any) => (
    <InputBase
      label={label}
      handleInputChange={onChange}
      onClick={onClick}
      value={value}
      modificator={[styles.dateInput, modificator]}
      width={'293px'} /* TODO считать ширину */
      ref={null}
    >
      <IconCalendar className={styles.icon} />
    </InputBase>
  )
)
DateInput.displayName = 'DateInput'

export default DateInput
