import { FC, Dispatch, SetStateAction, useState } from 'react'

import SingleAttribute from './SingleAttribute'
import ButtonAdd from './ButtonAdd'

import { ATTRIBUTES_OPTIONS } from 'constants/SidePopup'
import { IActionDropDown, IStatePopup } from 'types/sidePopup'

import styles from './AttributeAction.module.scss'

export interface IAttributeAction {
  currentState: IStatePopup
  action: IActionDropDown
  setState: Dispatch<SetStateAction<IStatePopup>> /* TODO хуйня какая то */
}

const AttributeAction: FC<IAttributeAction> = (props) => {
  const { action, currentState } = props
  const actionName = action.name
  action.options = ATTRIBUTES_OPTIONS

  const getStoredAttributes = (): string[] => {
    const defaultInitAttrs = [ATTRIBUTES_OPTIONS[0].name]
    const storedAttrs = currentState[actionName]
    let filledAttrs

    if (storedAttrs) {
      filledAttrs = Object.entries(storedAttrs)
        .filter(([key, value]) => value)
        .map(([key]) => key)
    }

    return filledAttrs || defaultInitAttrs
  }

  const [prevAttrs, setPrevAttrs] = useState<string[]>(getStoredAttributes)

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>{'Атрибут'}</div>
      <div className={styles.label}>{'Значение'}</div>

      {prevAttrs.map((attrName, index) => (
        <SingleAttribute
          {...props}
          id={attrName}
          key={index}
          prevAttrs={prevAttrs}
          setPrevAttrs={setPrevAttrs}
        />
      ))}

      <ButtonAdd {...{ prevAttrs, setPrevAttrs }} />
    </div>
  )
}

export default AttributeAction
