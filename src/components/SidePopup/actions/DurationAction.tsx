import { FC } from 'react'

import usePopupContext from 'context/SidePopupContext'

import NumericStepAction from './NumericStepAction'
import DropDownAction from './DropDownAction'

import { TIME_OPTIONS } from 'constants/SidePopup'

import actionsStyles from './styles.module.scss'

const DurationAction: FC = () => {
  const { action } = usePopupContext()
  action.options = TIME_OPTIONS

  return (
    <div className={actionsStyles.durationWrapper}>
      <NumericStepAction />
      <DropDownAction label={'Временной отрезок'} />
    </div>
  )
}

export default DurationAction
