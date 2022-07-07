import { FC, Dispatch, SetStateAction } from 'react'
import cx from 'classnames'

import Slider from 'components/parts/Slider/Slider'

import styles from './styles.module.scss'

import { IAction, IState } from 'types/sidePopup'

interface ISliderAction {
  currentState: IState
  action: IAction
  setState: Dispatch<SetStateAction<IState>> /* TODO хуйня какая то */
}

const SliderAction: FC<ISliderAction> = ({ action, currentState, setState }) => {
  const actionName = action.name
  const title = action.title
  const sliderValue = 0

  const handleChange = (value: number) => {
    const newState = {
      ...currentState,
      [actionName]: value.toString(),
    }
    setState(newState)
  }

  return (
    <>
      <p className={cx(styles.title, 'text_1')}>{title}</p>
      <Slider
        value={Number(currentState[actionName])}
        title={actionName}
        initValue={sliderValue}
        handleChange={handleChange}
        number={1}
      />
    </>
  )
}

export default SliderAction
