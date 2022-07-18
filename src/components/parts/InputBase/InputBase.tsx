import { FC, ChangeEvent } from 'react'
import InputMask from 'react-input-mask'

import cx from 'classnames'

import styles from './InputBase.module.scss'

import { IconLoupe } from 'assets/icons'
export interface IInputBase extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  mask?: string
  type?: string
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void
  modificator?: string | string[]
  disabled?: boolean
  autocomplete?: string
  icon?: boolean
  wrapperModificator?: string | string[]
  ref?: any
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
  icon,
  wrapperModificator,
  ...props
}) => {
  return (
    <div
      style={{ width: width }}
      className={cx(styles.wrapper, wrapperModificator, { [styles.disabled]: disabled })}
    >
      {label && (
        <label className={styles.inputLabel} htmlFor={id}>
          {label}
        </label>
      )}
      <InputMask
        className={cx(styles.input, modificator, 'text_1')}
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
        {...props}
      />
      {icon && <IconLoupe className={styles.iconLoupe} />}
      {children}
    </div>
  )
}

export default InputBase
