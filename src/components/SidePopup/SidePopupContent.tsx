import { FC } from 'react'

import usePopupContext from 'context/SidePopupContext'

import DatePickAction from './actions/DatePickAction'
import TextAreaAction from './actions/TextAreaAction'
import InputAction from './actions/InputAction'
import SliderAction from './actions/SliderAction'
import RadioGroupAction from './actions/RadioGroupAction'
import SliderRelation from './actions/SliderRelationAction'

import FilterAction from './actions/FilterAction/FilterAction'
import NumericStepAction from './actions/NumericStepAction'
import AttributeAction from './actions/AttributeAction/AttributeAction'
import EmailConfigAction from './actions/EmailConfigAction'
import TableAction from './actions/TableAction'
import DropDownAction from './actions/DropDownAction'
import AttibuteConditionAction from './actions/AttibuteConditionAction'

import { SidePopupActions } from 'constants/sidePopup'

import styles from './SidePopup.module.scss'

const SidePopupContent: FC = () => {
  const { step } = usePopupContext()
  const actions = step.actions

  const nodes = actions.map((action: any, index: number) => {
    const { type } = action

    console.log({ action })

    switch (type) {
      case SidePopupActions.ATTRIBUTES:
        return <AttributeAction key={index} {...action} />
      case SidePopupActions.RADIO:
        return <RadioGroupAction key={index} {...action} />
      case SidePopupActions.SLIDER:
        return <SliderAction key={index} {...action} />
      case SidePopupActions.SLIDER_RELATION:
        return <SliderRelation key={index} {...action} />
      case SidePopupActions.INPUT:
        return <InputAction key={index} {...action} />
      case SidePopupActions.NUMERIC_STEP:
        return <NumericStepAction key={index} {...action} />
      case SidePopupActions.TEXTAREA:
        return <TextAreaAction key={index} {...action} />
      case SidePopupActions.DATE:
        return <DatePickAction key={index} {...action} />
      case SidePopupActions.FILTER:
        return <FilterAction key={index} {...action} />
      case SidePopupActions.TABLE:
        return <TableAction key={index} {...action} />
      case SidePopupActions.EMAIL:
        return <EmailConfigAction key={index} {...action} />
      case SidePopupActions.DROP_DOWN:
        return <DropDownAction key={index} {...action} />
      case SidePopupActions.ATTRIBUTE_CONDITION:
        return <AttibuteConditionAction key={index} {...action} />
      default:
        return null
    }
  })
  return <div className="actions">{nodes}</div>
}

export default SidePopupContent
