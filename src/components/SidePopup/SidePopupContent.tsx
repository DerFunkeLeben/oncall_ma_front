import { FC, Dispatch, SetStateAction } from 'react'
import cx from 'classnames'

import styles from './SidePopup.module.scss'

import TextAreaAction from './actions/TextAreaAction'
import InputAction from './actions/InputAction'
import SliderAction from './actions/SliderAction'
import RadioGroupAction from './actions/RadioGroupAction'
import SliderRelation from './actions/SliderRelationAction'
import DurationAction from './actions/DurationAction'

import { IState } from 'types/sidePopup'

interface ISidePopupContent {
  configArray: any
  currentStep: number
  state: IState
  setState: Dispatch<SetStateAction<IState>>
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
    case 'duration':
      return <DurationAction {...props} />
    case 'radiogroup':
      return <RadioGroupAction {...props} />
    case 'slider':
      return <SliderAction {...props} />
    case 'sliderRelation':
      return <SliderRelation {...props} />
    case 'inputs':
      return (
        <InputAction
          {...props}
          label={'Тема'} // получать из конфига
        />
      )
    case 'textarea':
      return (
        <TextAreaAction
          {...props}
          subtitle={'Приглашение впч'} // получить с предыдущего шага из таблицы
        />
      )
    case 'filter':
      return (
        <div key={name}>
          <p>filter</p>
        </div>
      )
    case 'table':
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
