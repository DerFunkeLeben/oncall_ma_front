import { FC, Dispatch, SetStateAction } from 'react'

import RadioGroup from 'components/parts/RadioGroup/RadioGroup'

import { IActionRadio, IState } from 'types/sidePopup'
import DropDown from 'components/parts/DropDown/DropDown'
import Button from 'components/parts/Button/Button'

import dropDownStyles from 'components/parts/DropDown/DropDown.module.scss'

interface IDurationAction {
  currentState: IState
  action: IActionRadio
  setState: Dispatch<SetStateAction<IState>> /* TODO хуйня какая то */
}

const DurationAction: FC<IDurationAction> = ({ action, currentState, setState }) => {
  const actionName = action.name
  const title = action.title

  const handleChange = (value: string) => {
    const newState = {
      ...currentState,
      [actionName]: value,
    }
    setState(newState)
  }

  const timeSizes = [
    'Месяцaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaы',
    'Недели',
    'Дни',
    'Часы',
    'Минуты',
  ]

  return (
    <>
      <p>Временной отрезок</p>
      <DropDown
        triggerNode={
          <button className={dropDownStyles.triggerButton}>
            <span>Создать аудиторию</span>
          </button>
        }
      >
        <div className={dropDownStyles.container}>
          {timeSizes.map((timesize) => (
            <button
              key={timesize}
              className={dropDownStyles.element}
              onClick={() => console.log('click')}
            >
              {timesize}
            </button>
          ))}
        </div>
      </DropDown>
    </>
  )
}

export default DurationAction
