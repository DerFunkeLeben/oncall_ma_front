import { FC, Dispatch, SetStateAction, SyntheticEvent, useState, useEffect } from 'react'
import cx from 'classnames'

import usePopupContext from 'context/SidePopupContext'

import DropDown from 'components/parts/DropDown/DropDown'
import { IOption } from 'types/sidePopup'
import { useSidePopup } from 'store/sidePopupStore/useSidePopup'

import dropDownStyles from 'components/parts/DropDown/DropDown.module.scss'
import styles from './styles.module.scss'

interface IDropDownAction {
  label?: string
  disabledOptions?: string[]
  setDisabledOptions?: Dispatch<SetStateAction<string[]>>
  settingName: string
  options: IOption[]
  applySettings: any
}

const DropDownAction: FC<IDropDownAction> = ({
  label,
  disabledOptions = [],
  setDisabledOptions,
  settingName,
  options,
  applySettings,
}) => {
  const { step, tempSettings, setTempSettings } = usePopupContext()
  const { updateTempSettings } = useSidePopup()
  const actionName = step.name

  const currentValue =
    tempSettings && tempSettings[settingName] ? tempSettings[settingName] : options[0].name

  useEffect(() => {
    changeSettings(currentValue)
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
    console.log(selectOption)

    if (!selectOption || selectOption === currentValue) return

    const optionValue = selectOption ? selectOption : currentValue

    changeSettings(optionValue)
  }

  const changeSettings = (selectOption: any) => {
    applySettings(selectOption, tempSettings, updateTempSettings)
  }

  return (
    <div>
      {label && <div className={styles.label}>{label}</div>}
      <DropDown
        triggerNode={
          <button className={dropDownStyles.triggerButton}>
            <span>{getOptionLabel(currentValue)}</span>
          </button>
        }
      >
        <div className={dropDownStyles.container}>
          {options.map((option) => {
            const { name } = option
            const isDisabled = currentValue !== name && disabledOptions.find((opt) => opt === name)

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
