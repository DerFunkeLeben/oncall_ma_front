import { FC, ChangeEvent } from 'react'
import InputMask from 'react-input-mask'

import cx from 'classnames'

import styles from './InputBase.module.scss'
export interface IInputBase extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  mask?: string
  type?: string
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void
  children?: React.ReactNode
  modificator?: string | string[]
  disabled?: boolean
  autocomplete?: string
}

const InputBase: FC<IInputBase> = ({
  id,
  name,
  label,
  width,
  placeholder,
  value,
  mask = undefined,
  handleInputChange,
  onClick,
  type = 'text',
  required = false,
  children,
  modificator,
  disabled,
  autocomplete,
}) => {
  return (
    <div style={{ width: width }} className={cx(styles.wrapper, { [styles.disabled]: disabled })}>
      {label && (
        <label className={styles.inputLabel} htmlFor={id}>
          {label}
        </label>
      )}
      <InputMask
        className={cx(styles.input, modificator)}
        id={id}
        name={name}
        value={value}
        type={type}
        required={required}
        placeholder={placeholder}
        onChange={handleInputChange}
        onClick={onClick}
        autoComplete={autocomplete || 'off'}
        mask={mask || ''}
      ></InputMask>
      {children}
    </div>
  )
}

export default InputBase
