import { FC, Dispatch, SetStateAction } from 'react'

import DropDownAction from '../DropDownAction'
import InputAction from '../InputAction'

import { ATTRIBUTES_OPTIONS } from 'constants/SidePopup'
import { IAttributeAction } from './AttributeAction'

interface ISingleAtr extends IAttributeAction {
  id: string
  prevAttrs: string[]
  setPrevAttrs: Dispatch<SetStateAction<string[]>>
}

const SingleAttribute: FC<ISingleAtr> = ({
  action,
  currentState,
  setState,
  id,
  prevAttrs,
  setPrevAttrs,
}) => {
  const getOptionType = (optionName: string): string => {
    const opt = ATTRIBUTES_OPTIONS.find((option) => optionName === option.name)
    return opt?.type || 'text'
  }

  const type = getOptionType(id)

  return (
    <>
      <DropDownAction
        {...{ action, currentState, setState }}
        disabledOptions={prevAttrs}
        setDisabledOptions={setPrevAttrs}
        id={id}
      />
      <InputAction {...{ action, currentState, setState }} id={id} type={type} />
    </>
  )
}

export default SingleAttribute
