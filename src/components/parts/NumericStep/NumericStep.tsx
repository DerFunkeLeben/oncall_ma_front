import { FC } from 'react'
import NumericInput from 'react-numeric-input'

import cx from 'classnames'

import styles from './NumericStep.module.scss'

export interface INumericStep extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  handleChange: (value: number | null) => void
  modificator?: string | string[]
  disabled?: boolean
  max?: number
  value?: number
  step?: number
}

const NumericStep: FC<INumericStep> = ({
  id,
  name,
  label,
  value = 0,
  handleChange,
  required = false,
  modificator,
  disabled,
  max = 10000,
  step = 1,
}) => {
  return (
    <div className={cx(styles.wrapper, { [styles.disabled]: disabled })}>
      {label && (
        <label className={styles.inputLabel} htmlFor={id}>
          {label}
        </label>
      )}
      <NumericInput
        className={cx(styles.input, modificator, styles.numericStep)}
        strict
        min={0}
        max={max}
        value={value}
        step={step}
        style={false}
        id={id}
        name={name}
        required={required}
        onChange={handleChange}
      />
    </div>
  )
}

export default NumericStep
