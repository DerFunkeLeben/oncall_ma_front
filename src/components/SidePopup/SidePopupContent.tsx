import { FC } from 'react'

import usePopupContext from 'context/SidePopupContext'

import DatePickAction from './actions/DatePickAction'
import TextAreaAction from './actions/TextAreaAction'
import InputAction from './actions/InputAction'
import SliderAction from './actions/SliderAction'
import RadioGroupAction from './actions/RadioGroupAction'
import SliderRelation from './actions/SliderRelationAction'
import DurationAction from './actions/DurationAction'
import FilterAction from './actions/FilterAction/FilterAction'
import NumericStepAction from './actions/NumericStepAction'
import AttributeAction from './actions/AttributeAction/AttributeAction'

import { SidePopupActions } from 'constants/sidePopup'

import styles from './SidePopup.module.scss'

const SidePopupContent: FC = () => {
  const { action } = usePopupContext()

  const { type, name } = action

  switch (type) {
    case SidePopupActions.ATTRIBUTES:
      return <AttributeAction key={name} />
    case SidePopupActions.DURATION:
      return <DurationAction key={name} />
    case SidePopupActions.RADIO:
      return <RadioGroupAction key={name} />
    case SidePopupActions.SLIDER:
      return <SliderAction key={name} />
    case SidePopupActions.SLIDER_RELATION:
      return <SliderRelation key={name} />
    case SidePopupActions.INPUT:
      return <InputAction key={name} />
    case SidePopupActions.NUMERIC_STEP:
      return <NumericStepAction key={name} />
    case SidePopupActions.TEXTAREA:
      return <TextAreaAction key={name} subtitle={'Приглашение впч'} />
    case SidePopupActions.DATE:
      return <DatePickAction key={name} />
    case SidePopupActions.FILTER:
      return <FilterAction key={name} />
    case SidePopupActions.TABLE:
      return (
        <div key={name}>
          <p>table</p>
        </div>
      )
    default:
      return null
  }
}

export default SidePopupContent
