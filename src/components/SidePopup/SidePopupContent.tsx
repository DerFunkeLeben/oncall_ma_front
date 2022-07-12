import { FC, Dispatch, SetStateAction } from 'react'
import cx from 'classnames'

import styles from './SidePopup.module.scss'

import TextAreaAction from './actions/TextAreaAction'
import InputAction from './actions/InputAction'
import SliderAction from './actions/SliderAction'
import RadioGroupAction from './actions/RadioGroupAction'
import SliderRelation from './actions/SliderRelationAction'
import DurationAction from './actions/DurationAction'
import FilterAction from './actions/FilterAction/FilterAction'
import NumericStepAction from './actions/NumericStepAction'
import AttributeAction from './actions/AttributeAction/AttributeAction'

import { SidePopupActions } from 'constants/SidePopup'

import { IStatePopup } from 'types/sidePopup'

interface ISidePopupContent {
  configArray: any
  currentStep: number
  state: IStatePopup
  setState: Dispatch<SetStateAction<IStatePopup>>
}

const SidePopupContent: FC<ISidePopupContent> = ({ configArray, state, currentStep, setState }) => {
  const currentStepIndex = currentStep - 1
  const step = configArray[currentStepIndex]
  const { type, name } = step

  const props = {
    key: name,
    action: configArray[currentStepIndex],
    currentState: state,
    setState,
  }

  switch (type) {
    case SidePopupActions.ATTRIBUTES:
      return <AttributeAction {...props} />
    case SidePopupActions.DURATION:
      return <DurationAction {...props} />
    case SidePopupActions.RADIO:
      return <RadioGroupAction {...props} />
    case SidePopupActions.SLIDER:
      return <SliderAction {...props} />
    case SidePopupActions.SLIDER_RELATION:
      return <SliderRelation {...props} />
    case SidePopupActions.INPUT:
      return (
        <InputAction
          {...props}
          label={'Тема'} // получать из конфига
        />
      )
    case SidePopupActions.NUMERIC_STEP:
      return <NumericStepAction {...props} label={'Количество'} />
    case SidePopupActions.TEXTAREA:
      return (
        <TextAreaAction
          {...props}
          subtitle={'Приглашение впч'} // получить с предыдущего шага из таблицы
        />
      )
    case SidePopupActions.FILTER:
      return <FilterAction {...props} />
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
