import { FC, Dispatch, SetStateAction, SyntheticEvent, useState, useEffect } from 'react'
import cx from 'classnames'

import usePopupContext from 'context/SidePopupContext'

import DropDown from 'components/parts/DropDown/DropDown'
import { IOption } from 'types/sidePopup'

import dropDownStyles from 'components/parts/DropDown/DropDown.module.scss'
import styles from './styles.module.scss'

interface IDropDownAction {
  label?: string
  id?: string
  disabledOptions?: string[]
  setDisabledOptions?: Dispatch<SetStateAction<string[]>>
  preset?: { [key: string]: any }
  optionName: string
}

const DropDownAction: FC<IDropDownAction> = ({
  label,
  id,
  disabledOptions = [],
  setDisabledOptions,
  preset,
  optionName,
}) => {
  const { action, currentState, setState } = usePopupContext()
  const actionName = action.name
  const options = action.options as IOption[]

  const defaultOption = preset ? preset[optionName] : options[0].name

  const [pickedOption, setPickedOption] = useState<string>(id || defaultOption)

  useEffect(() => {
    changeSettings(pickedOption)
  }, [])

  const replaceOption = (prevOption: string, newOption: string): void => {
    if (!setDisabledOptions) return

    const newDisabledOptions = disabledOptions.map((option) =>
      option === prevOption ? newOption : option
    )

    setDisabledOptions(newDisabledOptions)
  }

  const getOptionLabel = (name: string | undefined): string => {
    const option = options.find((opt: { name: string | undefined }) => opt.name === name)
    return option?.label || ''
  }

  const handleChange = (event: SyntheticEvent<HTMLButtonElement>) => {
    const selectOption = event.currentTarget.dataset.option

    if (!selectOption || selectOption === pickedOption) return

    const optionValue = selectOption ? selectOption : pickedOption

    changeSettings(optionValue)
  }

  const changeSettings = (selectOption: any) => {
    const newState = {
      ...currentState,
      [actionName]: {
        ...currentState[actionName],
        ...preset,
        [optionName]: selectOption,
      },
    }

    replaceOption(pickedOption, selectOption)
    setPickedOption(selectOption)
    setState(newState)
  }

  return (
    <div>
      {label && <div className={styles.label}>{label}</div>}
      <DropDown
        triggerNode={
          <button className={dropDownStyles.triggerButton}>
            <span>{getOptionLabel(pickedOption)}</span>
          </button>
        }
      >
        <div className={dropDownStyles.container}>
          {options.map((option) => {
            const { name } = option
            const isDisabled = pickedOption !== name && disabledOptions.find((opt) => opt === name)

            return (
              <button
                key={option.name}
                data-option={option.name}
                className={cx(dropDownStyles.element, styles.dropDownOption, {
                  [styles.disabled]: isDisabled,
                })}
                onClick={handleChange}
              >
                {option.label}
              </button>
            )
          })}
        </div>
      </DropDown>
    </div>
  )
}

export default DropDownAction
