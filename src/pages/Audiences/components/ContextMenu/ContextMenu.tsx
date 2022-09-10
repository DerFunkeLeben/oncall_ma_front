import { FC } from 'react'
import cx from 'classnames'

import DropDown from 'components/parts/DropDown/DropDown'

import { IconDots, IconEdit, IconTrash } from 'assets/icons'
import styles from './ContextMenu.module.scss'
import dropDownStyles from 'components/parts/DropDown/DropDown.module.scss'

interface IContextMenu {
  handleEdit: () => void
  handleRemove: () => void
}

const ContextMenu: FC<IContextMenu> = ({ handleEdit, handleRemove }) => (
  <DropDown
    triggerNode={
      <button className={cx(styles.iconDots)}>
        <IconDots />
      </button>
    }
    customStyles={styles}
  >
    <div className={cx(dropDownStyles.container, styles.dropDownContainer)}>
      <button
        className={cx(dropDownStyles.element, dropDownStyles.dropDownOption, 'text_1')}
        onClick={handleEdit}
      >
        <IconEdit />
        <span>Редактировать</span>
      </button>

      <button
        className={cx(
          dropDownStyles.element,
          dropDownStyles.dropDownOption,
          styles.alert,
          'text_1'
        )}
        onClick={handleRemove}
      >
        <IconTrash />
        <span>Удалить</span>
      </button>
    </div>
  </DropDown>
)

export default ContextMenu
