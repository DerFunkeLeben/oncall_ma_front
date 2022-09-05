import { FC } from 'react'
import cx from 'classnames'

import DropDown from 'components/parts/DropDown/DropDown'

import { IconDots, IconEdit, IconTrash } from 'assets/icons'
import styles from './Folders.module.scss'
import dropDownStyles from 'components/parts/DropDown/DropDown.module.scss'

interface IFolderContextMenu {
  openRenamePopup: (id: string) => void
  openDeletePopup: (id: string) => void
  folderId: string
}
const FolderContextMenu: FC<IFolderContextMenu> = ({
  openRenamePopup,
  openDeletePopup,
  folderId,
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
        className={cx(dropDownStyles.element, styles.dropDownOption, 'text_1')}
        onClick={() => openRenamePopup(folderId)}
      >
        <IconEdit />
        <span>Переименовать</span>
      </button>

      <button
        className={cx(dropDownStyles.element, styles.dropDownOption, styles.alert, 'text_1')}
        onClick={() => openDeletePopup(folderId)}
      >
        <IconTrash />
        <span>Удалить</span>
      </button>
    </div>
  </DropDown>
)

export default FolderContextMenu
