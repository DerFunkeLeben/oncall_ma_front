import { FC, useState } from 'react'
import ReactSlider from 'rc-slider'
import cx from 'classnames'

import 'rc-slider/assets/index.css'
import styles from './Slider.module.scss'

export interface ISlider extends React.InputHTMLAttributes<HTMLDivElement> {
  title: string
  handleChange?: (value: number) => void
  modificator?: string | string[]
  initValue?: number
  step?: number
}

const Slider: FC<ISlider> = ({
  width = '50%',
  title,
  initValue,
  step = 10,
  handleChange,
  modificator,
}) => {
  const [sliderValue, setSliderValue] = useState<number | number[]>(initValue || 0)

  const handleValueChange = (value: number | number[]) => {
    if (Array.isArray(value)) [value] = value

    handleChange?.(value)
    setSliderValue(value)
  }

  return (
    <div style={{ width: width }} className={styles.wrapper}>
      <div className={styles.sliderTitle}>{title}</div>
      <div className={styles.sliderValue}>{sliderValue}%</div>

      <ReactSlider
        min={0}
        max={100}
        step={step}
        defaultValue={sliderValue}
        className={cx(styles.slider, modificator)}
        onChange={handleValueChange}
        trackStyle={{ borderRadius: 0 }}
        railStyle={{ borderRadius: 0 }}
        handleStyle={{
          border: 'none',
          boxShadow: 'none',
          opacity: 1,
          transition: '0.2s',
        }}
      />
    </div>
  )
}

export default Slider
