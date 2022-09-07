import { FC } from 'react'
import cx from 'classnames'

import DropDown from 'components/parts/DropDown/DropDown'

import { IconDots, IconEdit, IconTrash } from 'assets/icons'
import styles from './ContextMenu.module.scss'
import dropDownStyles from 'components/parts/DropDown/DropDown.module.scss'

interface IContextMenu {
  handleEdit: (id: string) => void
  handleRemove: (id: string) => void
  id: string
}

const ContextMenu: FC<IContextMenu> = ({ handleEdit, handleRemove, id }) => (
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
        className={cx(dropDownStyles.element, styles.dropDownOption, 'text_1')}
        onClick={() => handleEdit(id)}
      >
        <IconEdit />
        <span>Редактировать</span>
      </button>

      <button
        className={cx(dropDownStyles.element, styles.dropDownOption, styles.alert, 'text_1')}
        onClick={() => handleRemove(id)}
      >
        <IconTrash />
        <span>Удалить</span>
      </button>
    </div>
  </DropDown>
)

export default ContextMenu
