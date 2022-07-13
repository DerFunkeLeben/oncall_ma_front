import { FC, Dispatch, SetStateAction, SyntheticEvent, useState } from 'react'
import cx from 'classnames'

import DropDown from 'components/parts/DropDown/DropDown'
import { IActionDropDown, IStatePopup, IOption } from 'types/sidePopup'

import dropDownStyles from 'components/parts/DropDown/DropDown.module.scss'
import styles from './styles.module.scss'

interface IDropDownAction {
  currentState: IStatePopup
  action: IActionDropDown
  setState: Dispatch<SetStateAction<IStatePopup>>
  label?: string
  id?: string
  disabledOptions?: string[]
  setDisabledOptions?: Dispatch<SetStateAction<string[]>>
}

const getOptionLabel = (options: IOption[], name: string | undefined): string => {
  const option = options.find((opt) => opt.name === name)
  return option?.label || ''
}

const DropDownAction: FC<IDropDownAction> = ({
  action,
  currentState,
  setState,
  label,
  id,
  disabledOptions = [],
  setDisabledOptions,
}) => {
  const actionName = action.name
  const { options } = action

  const [pickedOption, setPickedOption] = useState<string>(id || options[0].name)

  const replaceOption = (prevOption: string, newOption: string): void => {
    if (!setDisabledOptions) return

    const newDisabledOptions = disabledOptions.map((option) =>
      option === prevOption ? newOption : option
    )

    setDisabledOptions(newDisabledOptions)
  }

  const handleChange = (event: SyntheticEvent<HTMLButtonElement>) => {
    const optionName = event.currentTarget.dataset.option

    if (!optionName || optionName === pickedOption) return

    const newState = {
      ...currentState,
      [actionName]: {
        ...currentState[actionName],

        [pickedOption]: undefined,
        [optionName]: '' /* TODO: хуйня */,
      },
    }

    replaceOption(pickedOption, optionName)
    setPickedOption(optionName)
    setState(newState)
  }

  return (
    <div>
      {label && <div className={styles.label}>{label}</div>}
      <DropDown
        triggerNode={
          <button className={dropDownStyles.triggerButton}>
            <span>{getOptionLabel(options, pickedOption)}</span>
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
