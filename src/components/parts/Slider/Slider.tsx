import { FC, useEffect, useState } from 'react'
import ReactSlider from 'rc-slider'
import cx from 'classnames'

import 'rc-slider/assets/index.css'
import styles from './Slider.module.scss'

export interface ISlider extends React.InputHTMLAttributes<HTMLDivElement> {
  title?: string
  handleChange?: (value: number, index: number | undefined) => void
  modificator?: string | string[]
  initValue?: number
  step?: number
  value?: number
  number: number
}

const Slider: FC<ISlider> = ({
  width = '50%',
  title,
  initValue,
  step = 10,
  handleChange,
  modificator,
  value,
  number,
}) => {
  const [sliderValue, setSliderValue] = useState<number | number[]>(initValue || 0)

  /*
  TODO слайдер должен быть тупой
  */

  const handleValueChange = (newValue: number | number[]) => {
    if (Array.isArray(newValue)) [newValue] = newValue

    handleChange?.(newValue, number)
    setSliderValue(newValue)
  }

  useEffect(() => {
    if (!value) return
    handleValueChange(value)
  }, [value])

  return (
    <div style={{ width: width }} className={styles.wrapper}>
      {title && <div className={styles.sliderTitle}>{title}</div>}
      <div className={styles.sliderValue}>{value || 0}%</div>

      <ReactSlider
        min={0}
        max={100}
        step={step}
        defaultValue={sliderValue}
        value={value}
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
