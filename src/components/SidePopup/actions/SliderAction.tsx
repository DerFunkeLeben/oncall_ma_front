import { FC, Dispatch, SetStateAction } from 'react'

import Slider from 'components/parts/Slider/Slider'

import { IAction } from 'types/sidePopup'
import { IState } from 'pages/Audiences/OneAudience/OneAudience' // перенести типы

interface ISliderAction {
  title: string
  currentState: IState
  action: IAction
  setState: Dispatch<SetStateAction<IState>> /* TODO хуйня какая то */
}

const SliderAction: FC<ISliderAction> = ({ action, currentState, setState, title }) => {
  const actionName = action.name
  const sliderValue = +(currentState[actionName] || 0)

  const handleChange = (value: number) => {
    const newState = {
      ...currentState,
      [actionName]: value.toString(),
    }
    setState(newState)
  }

  return <Slider title={title} initValue={sliderValue} handleChange={handleChange} />
}

export default SliderAction
