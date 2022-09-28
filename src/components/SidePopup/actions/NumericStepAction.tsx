import { FC, useEffect } from 'react'

import usePopupContext from 'context/SidePopupContext'
import NumericStep from 'components/parts/NumericStep/NumericStep'
import { useSidePopup } from 'store/sidePopupStore/useSidePopup'
import { IAction } from 'types/sidePopup'

const NumericStepAction: FC<IAction> = ({ label, settingName, applySettings }) => {
  const { step, tempSettings } = usePopupContext()
  const { updateTempSettings } = useSidePopup()
  const actionName = step.name

  const currentValue = tempSettings && tempSettings[settingName] ? tempSettings[settingName] : 0

  const handleChange = (value: number | null) => {
    applySettings(value, tempSettings, updateTempSettings)
  }

  return (
    <NumericStep label={label} name={actionName} value={currentValue} handleChange={handleChange} />
  )
}

export default NumericStepAction
