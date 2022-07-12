import { FC, Dispatch, SetStateAction } from 'react'
import cx from 'classnames'

import Slider from 'components/parts/Slider/Slider'

import styles from './styles.module.scss'

import { IAction, IStatePopup } from 'types/sidePopup'

interface ISliderAction {
  currentState: IStatePopup
  action: IAction
  setState: Dispatch<SetStateAction<IStatePopup>> /* TODO хуйня какая то */
}

const SliderAction: FC<ISliderAction> = ({ action, currentState, setState }) => {
  const actionName = action.name
  const title = action.title
  const sliderValue = +(currentState[actionName]?.value || 0)

  const handleChange = (value: number) => {
    const newState = {
      ...currentState,
      [actionName]: {
        ...currentState[actionName],
        value: value.toString(),
      },
    }
    setState(newState)
  }

  return (
    <>
      <p className={cx(styles.title, 'text_1')}>{title}</p>
      <Slider value={sliderValue} title={actionName} handleChange={handleChange} number={1} />
    </>
  )
}

export default SliderAction
