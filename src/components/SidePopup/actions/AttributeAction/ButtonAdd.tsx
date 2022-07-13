import { FC, Dispatch, SetStateAction } from 'react'
import cx from 'classnames'

import { ATTRIBUTES_OPTIONS } from 'constants/SidePopup'
import { IOption } from 'types/sidePopup'

import styles from './AttributeAction.module.scss'

interface IButton {
  prevAttrs: string[]
  setPrevAttrs: Dispatch<SetStateAction<string[]>>
}

const ButtonAdd: FC<IButton> = ({ prevAttrs, setPrevAttrs }) => {
  const btnAddDisabled = ATTRIBUTES_OPTIONS.length === prevAttrs.length

  const getAvailableOption = (): IOption | undefined => {
    return ATTRIBUTES_OPTIONS.find((option) =>
      prevAttrs.every((prevAttr) => prevAttr !== option.name)
    )
  }

  const handleAddBtn = () => {
    const availableOption = getAvailableOption()
    if (!availableOption) return

    setPrevAttrs([...prevAttrs, availableOption.name])
  }

  return (
    <div
      className={cx(styles.buttonAdd, {
        [styles.disabled]: btnAddDisabled,
      })}
      onClick={handleAddBtn}
    >
      <span>+</span>
      Добавить атрибут
    </div>
  )
}

export default ButtonAdd
