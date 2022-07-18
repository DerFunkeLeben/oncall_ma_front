import { FC, Dispatch, SetStateAction } from 'react'

import DropDownAction from '../DropDownAction'
import InputAction from '../InputAction'

import { ATTRIBUTES_OPTIONS } from 'constants/sidePopupConsts'

interface ISingleAtr {
  id: string
  prevAttrs: string[]
  setPrevAttrs: Dispatch<SetStateAction<string[]>>
}

const SingleAttribute: FC<ISingleAtr> = ({ id, prevAttrs, setPrevAttrs }) => {
  const getOptionType = (optionName: string): string => {
    const opt = ATTRIBUTES_OPTIONS.find((option) => optionName === option.name)
    return opt?.type || 'text'
  }

  const type = getOptionType(id)

  return (
    <>
      <DropDownAction disabledOptions={prevAttrs} setDisabledOptions={setPrevAttrs} id={id} />
      <InputAction type={type} stateKey={id} />
    </>
  )
}

export default SingleAttribute
