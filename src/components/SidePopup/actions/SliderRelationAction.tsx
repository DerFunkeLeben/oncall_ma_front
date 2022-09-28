import { FC } from 'react'
import cx from 'classnames'

import usePopupContext from 'context/SidePopupContext'
import Slider from 'components/parts/Slider/Slider'
import styles from './styles.module.scss'
import { IAction } from 'types/sidePopup'
import { useSidePopup } from 'store/sidePopupStore/useSidePopup'

const SliderRelation: FC<IAction> = ({ settingName, label, applySettings }) => {
  const { step, tempSettings, setState } = usePopupContext()
  const { updateTempSettings } = useSidePopup()
  const actionName = step.name
  const title = step.label
  const countOfBranches = step.count ? step.count : 2

  const handleChange = (value: number, index: number | undefined) => {
    const valuePair = {
      index,
      value,
    }
    applySettings(valuePair, tempSettings, updateTempSettings)
  }

  return (
    <>
      <p className={cx(styles.title, 'text_1')}>{title}</p>
      {[...Array(countOfBranches).keys()].map((number) => (
        <Slider
          title={`Ветка ${number + 1}`}
          handleChange={handleChange}
          value={Number(tempSettings[`slider_${number}`])}
          key={number}
          number={number}
          data-id={number}
        />
      ))}
    </>
  )
}

export default SliderRelation
