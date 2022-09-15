import { FC } from 'react'

import usePopupContext from 'context/SidePopupContext'
import RadioGroup from 'components/parts/RadioGroup/RadioGroup'
import { IAction, IOption } from 'types/sidePopup'
import { useSidePopup } from 'store/sidePopupStore/useSidePopup'

interface IRadioGroupAction extends IAction {
  options: IOption[]
}

const RadioGroupAction: FC<IRadioGroupAction> = ({ settingName, applySettings, options }) => {
  const { step, tempSettings } = usePopupContext()
  const { updateTempSettings } = useSidePopup()
  const actionName = step.name
  const pickedOptionName = tempSettings?.[actionName]?.[settingName]
    ? tempSettings[actionName][settingName]
    : ''
  console.log(tempSettings, pickedOptionName)
  const handleChange = (value: string) => {
    applySettings(value, tempSettings, updateTempSettings)
  }

  return <RadioGroup options={options} value={pickedOptionName} handleChange={handleChange} />
}

export default RadioGroupAction
