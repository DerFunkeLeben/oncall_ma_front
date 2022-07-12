import { FC, Dispatch, SetStateAction, SyntheticEvent } from 'react'
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
}

const getOptionLabel = (options: IOption[], name: string | undefined): string => {
  const option = options.find((opt) => opt.name === name)
  return option?.label || ''
}

const DropDownAction: FC<IDropDownAction> = ({ action, currentState, setState, label }) => {
  const actionName = action.name
  const { options } = action
  const initOption = getOptionLabel(options, currentState[actionName]?.option)
  const dropDownTitle = initOption || options[0].label

  const handleChange = (event: SyntheticEvent<HTMLButtonElement>) => {
    const optionName = event.currentTarget.dataset?.option
    const newState = {
      ...currentState,
      [actionName]: {
        ...currentState[actionName],
        option: optionName,
      },
    }
    setState(newState)
  }

  return (
    <div>
      <div className={styles.label}>{label}</div>
      <DropDown
        triggerNode={
          <button className={dropDownStyles.triggerButton}>
            <span>{dropDownTitle}</span>
          </button>
        }
      >
        <div className={dropDownStyles.container}>
          {options.map((option) => {
            return (
              <button
                key={option.name}
                data-option={option.name}
                className={cx(dropDownStyles.element, styles.dropDownOption)}
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
