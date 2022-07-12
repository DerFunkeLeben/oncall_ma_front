import { FC, Dispatch, SetStateAction, useEffect, useState, SyntheticEvent } from 'react'

import cx from 'classnames'
import DropDownAction from '../DropDownAction'

import { ATTRIBUTES_OPTIONS } from 'constants/SidePopup'
import { IActionDropDown, IStatePopup, IOption } from 'types/sidePopup'

import styles from './AttributeAction.module.scss'
import InputAction from '../InputAction'

interface IAttributeAction {
  currentState: IStatePopup
  action: IActionDropDown
  setState: Dispatch<SetStateAction<IStatePopup>> /* TODO хуйня какая то */
}
interface ISingleAtr extends IAttributeAction {
  id: string
}

const SingleAttribute: FC<ISingleAtr> = ({ action, currentState, setState, id }) => {
  return (
    <>
      <DropDownAction {...{ action, currentState, setState }} id={id} />
      <InputAction {...{ action, currentState, setState }} id={id} />
    </>
  )
}

const initAttr = [ATTRIBUTES_OPTIONS[0].name]

const AttributeAction: FC<IAttributeAction> = (props) => {
  const { action, currentState, setState } = props
  const actionName = action.name
  action.options = ATTRIBUTES_OPTIONS

  const [prevAttrs, setPrevAttrs] = useState(initAttr)

  const getAvailableOption = (): IOption | undefined => {
    return ATTRIBUTES_OPTIONS.find((option) =>
      prevAttrs.every((prevAttr) => prevAttr !== option.name)
    )
  }

  const addNewAttribute = () => {
    const availableOption = getAvailableOption()
    if (!availableOption) return

    setPrevAttrs([...prevAttrs, availableOption.name])
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>{'Атрибут'}</div>
      <div className={styles.label}>{'Значение'}</div>
      {prevAttrs.map((attrName, index) => {
        return <SingleAttribute {...props} id={attrName} key={index} />
      })}

      <div
        className={cx(styles.buttonAdd, {
          [styles.disabled]: !getAvailableOption(),
        })}
        onClick={addNewAttribute}
      >
        <span>+</span>
        Добавить атрибут
      </div>
    </div>
  )
}

export default AttributeAction
