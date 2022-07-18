import { FC, forwardRef } from 'react'

import InputBase from '../InputBase/InputBase'

import styles from './DatePicker.module.scss'

interface ITimeInput {
  value: any
  onClick: any
  onChange: any
  modificator?: string
}

/*TODO какая то хрень со временем */

const TimeInput: FC<ITimeInput> = forwardRef(
  ({ value, onClick, onChange, modificator = '' }: ITimeInput, ref: any) => (
    <InputBase
      handleInputChange={onChange}
      onClick={onClick}
      value={value}
      modificator={[styles.timeInput, modificator]}
      width={'100px'}
      ref={null}
    ></InputBase>
  )
)
TimeInput.displayName = 'TimeInput'

export default TimeInput
