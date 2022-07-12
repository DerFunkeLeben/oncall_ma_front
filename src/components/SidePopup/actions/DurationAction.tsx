import { FC, Dispatch, SetStateAction } from 'react'

import NumericStepAction from './NumericStepAction'
import DropDownAction from './DropDownAction'

import { IActionRadio, IStatePopup } from 'types/sidePopup'

import actionsStyles from './styles.module.scss'

interface IDurationAction {
  currentState: IStatePopup
  action: IActionRadio
  setState: Dispatch<SetStateAction<IStatePopup>> /* TODO хуйня какая то */
}

const timeSizes = [
  { name: 'month', label: 'Месяцы' },
  { name: 'weeks', label: 'Недели' },
  { name: 'days', label: 'Дни' },
  { name: 'hours', label: 'Часы' },
  { name: 'minutes', label: 'Минуты' },
]

const DurationAction: FC<IDurationAction> = (props) => {
  const { action } = props
  action.options = timeSizes

  return (
    <div className={actionsStyles.durationWrapper}>
      <NumericStepAction {...props} label="Количество" />
      <DropDownAction {...props} label={'Временной отрезок'} />
    </div>
  )
}

export default DurationAction
