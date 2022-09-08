import { FC } from 'react'

import usePopupContext from 'context/SidePopupContext'

import NumericStepAction from './NumericStepAction'
import DropDownAction from './DropDownAction'

import { TIME_OPTIONS } from 'constants/sidePopup'

import actionsStyles from './styles.module.scss'

const DurationAction: FC = () => {
  const { action, settings } = usePopupContext()
  const { name } = action
  action.options = TIME_OPTIONS
  const preset = settings?.name
  // console.log('preset', action.name, preset)

  return (
    <div className={actionsStyles.durationWrapper}>
      <NumericStepAction preset={preset} />
      <DropDownAction label={'Временной отрезок'} preset={preset} optionName={'unit'} />
    </div>
  )
}

export default DurationAction
