import { FC, useState } from 'react'

import usePopupContext from 'context/SidePopupContext'

import SingleAttribute from './SingleAttribute'
import ButtonAdd from './ButtonAdd'

import { ATTRIBUTES_OPTIONS } from 'constants/sidePopupConsts'

import styles from './AttributeAction.module.scss'

const AttributeAction: FC = () => {
  const { action, currentState } = usePopupContext()
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
