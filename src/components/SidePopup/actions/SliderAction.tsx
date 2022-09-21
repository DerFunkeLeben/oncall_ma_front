import { FC } from 'react'
import cx from 'classnames'

import usePopupContext from 'context/SidePopupContext'
import Slider from 'components/parts/Slider/Slider'
import styles from './styles.module.scss'

const SliderAction: FC = () => {
  const { action, currentState, setState } = usePopupContext()
  const actionName = action.name
  const title = action.title
  const sliderValue = +(currentState?.value || 0)

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
