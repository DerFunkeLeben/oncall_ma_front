import { FC } from 'react'
import cx from 'classnames'

import usePopupContext from 'context/SidePopupContext'
import Slider from 'components/parts/Slider/Slider'
import styles from './styles.module.scss'

const SliderRelation: FC = () => {
  const { action, currentState, setState } = usePopupContext()
  const actionName = action.name
  const title = action.title
  const countOfBranches = action.count ? action.count : 2
  const sliderValue = Number(currentState[actionName]?.value || 0)

  const handleChange = (value: number, index: number | undefined) => {
    const anotherIndex = index === 0 ? 1 : 0
    const anotherValue = 100 - value
    /**
     TODO
      нужно находить последний измененный слайдер на случай если их > 2
     */
    const newState = {
      ...currentState,
      [actionName]: {
        ...currentState[actionName],
        [`slider_${index}`]: value.toString(),
        [`slider_${anotherIndex}`]: anotherValue.toString(),
      },
    }
    setState(newState)
  }

  return (
    <>
      <p className={cx(styles.title, 'text_1')}>{title}</p>
      {[...Array(countOfBranches).keys()].map((number) => (
        <Slider
          title={`Ветка ${number + 1}`}
          initValue={sliderValue}
          handleChange={handleChange}
          value={Number(currentState[actionName]?.[`slider_${number}`])}
          key={number}
          number={number}
          data-id={number}
        />
      ))}
    </>
  )
}

export default SliderRelation
