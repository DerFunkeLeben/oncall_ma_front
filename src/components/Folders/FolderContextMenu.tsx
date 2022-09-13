import { FC } from 'react'
import cx from 'classnames'

import DropDown from 'components/parts/DropDown/DropDown'

import { IconDots, IconEdit, IconTrash } from 'assets/icons'
import styles from './Folders.module.scss'
import dropDownStyles from 'components/parts/DropDown/DropDown.module.scss'

interface IFolderContextMenu {
  openRenamePopup: (name: string) => void
  openDeletePopup: (name: string) => void
  folderName: string
}
const FolderContextMenu: FC<IFolderContextMenu> = ({
  openRenamePopup,
  openDeletePopup,
  folderName,
}) => (
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
        onClick={() => openRenamePopup(folderName)}
      >
        <IconEdit />
        <span>Переименовать</span>
      </button>

      <button
        className={cx(
          dropDownStyles.element,
          dropDownStyles.dropDownOption,
          styles.alert,
          'text_1'
        )}
        onClick={() => openDeletePopup(folderName)}
      >
        <IconTrash />
        <span>Удалить</span>
      </button>
    </div>
  </DropDown>
)

export default FolderContextMenu
