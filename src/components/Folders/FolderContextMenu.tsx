import cx from 'classnames'
import DropDown from 'components/parts/DropDown/DropDown'

import { IconDots, IconEdit, IconTrash } from 'assets/icons'
import styles from './Folders.module.scss'
import dropDownStyles from 'components/parts/DropDown/DropDown.module.scss'

const contextMenuActions = ['Переименовать', 'Удалить']

const FolderContextMenu = () => (
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
        onClick={(e) => console.log('aa')}
      >
        <IconEdit />
        <span>{contextMenuActions[0]}</span>
      </button>

      <button
        className={cx(dropDownStyles.element, styles.dropDownOption, styles.alert, 'text_1')}
        onClick={(e) => console.log('aa')}
      >
        <IconTrash />
        <span>{contextMenuActions[1]}</span>
      </button>
    </div>
  </DropDown>
)

export default FolderContextMenu
