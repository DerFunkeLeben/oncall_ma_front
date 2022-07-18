import { FC, ChangeEvent, useState } from 'react'

import cx from 'classnames'

import styles from './RadioGroup.module.scss'

import { IOption } from 'types/sidePopup'

export interface IRadioGroup {
  options: IOption[]
  value?: string
  handleChange?: (id: string) => void
  modificator?: string | string[]
}

interface IRadioInput extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  name: string
  label: string
  handleChange: (id: string) => void
  isChecked?: boolean
  modificator?: string | string[]
}

const RadioInput: FC<IRadioInput> = ({ name, label, id, isChecked, handleChange, modificator }) => {
  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleChange(event.currentTarget.id)
  }

  return (
    <div>
      <input
        type="radio"
        className={cx(styles.radioInput, modificator)}
        name={name}
        id={id}
        checked={isChecked}
        onChange={handleRadioChange}
      />
      <label htmlFor={id}>
        <span>{label}</span>
      </label>
    </div>
  )
}

const RadioGroup: FC<IRadioGroup> = ({ options, modificator, value, handleChange }) => {
  const [selectedInput, setSelectedInput] = useState<string>(value || '')

  const handleGroupChange = (inputValue: string) => {
    handleChange?.(inputValue)
    setSelectedInput(inputValue)
  }

  return (
    <div className={styles.wrapper}>
      {options.map((option, index) => {
        const { name, label } = option
        const isChecked = selectedInput === name
        return (
          <RadioInput
            name="option"
            key={index}
            id={name}
            label={label}
            isChecked={isChecked}
            modificator={modificator}
            handleChange={handleGroupChange}
          />
        )
      })}
    </div>
  )
}

export default RadioGroup
