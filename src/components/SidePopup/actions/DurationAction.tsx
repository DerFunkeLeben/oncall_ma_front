import { FC, Dispatch, SetStateAction } from 'react'

import NumericStepAction from './NumericStepAction'
import DropDownAction from './DropDownAction'

import { TIME_OPTIONS } from 'constants/SidePopup'
import { IActionDropDown, IStatePopup } from 'types/sidePopup'

import actionsStyles from './styles.module.scss'

interface IDurationAction {
  currentState: IStatePopup
  action: IActionDropDown
  setState: Dispatch<SetStateAction<IStatePopup>> /* TODO хуйня какая то */
}

const DurationAction: FC<IDurationAction> = (props) => {
  const { action } = props
  action.options = TIME_OPTIONS

  return (
    <div className={actionsStyles.durationWrapper}>
      <NumericStepAction {...props} label="Количество" />
      <DropDownAction {...props} label={'Временной отрезок'} />
    </div>
  )
}

export default DurationAction
