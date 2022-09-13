import { FC, useState, memo } from 'react'
import cx from 'classnames'

import Button from 'components/parts/Button/Button'
import FolderContextMenu from './FolderContextMenu'
import FolderPopup from './FolderPopup/FolderPopup'

import useAllFolders from 'store/folders/useAllFolders'
import useSetFolder from 'store/folders/useSetFolder'
import useAlertContext from 'context/AlertContext'

import { AlertBoxIcons } from 'constants/dictionary'
import { SURE_WANT_DELETE_FOLDER } from 'constants/helpMessages'
import { MainReducerKeys } from 'store/data-types'
import { FolderAction, IFolder } from 'types'
import { reduceBigNumbers } from 'utils'

import { IconPlus, IconFolderOpen, IconFolderClose } from 'assets/icons'
import buttonThemes from 'components/parts/Button/ButtonThemes.module.scss'
import styles from './Folders.module.scss'
import useMessageBoxContext from 'context/MessageBoxContext'
import { findFolderById } from 'store/folders/utils'

interface IFolders {
  reducerName: MainReducerKeys
}

export interface ICurrentFolder {
  folder?: IFolder
  action?: FolderAction
}

const { RENAME, CREATE, DELETE } = FolderAction

const Folders: FC<IFolders> = ({ reducerName }) => {
  const { allFolders, activeFolderName } = useAllFolders(reducerName)
  const { viewFolder, deleteFolder } = useSetFolder(reducerName)
  const { setAlertBox } = useAlertContext()
  const { setMessageBox } = useMessageBoxContext()

  const [currentFolder, setCurrentFolder] = useState<ICurrentFolder>({})

  const setActiveFolder = (e: React.MouseEvent<HTMLElement>) => {
    const { id } = e.currentTarget.dataset
    if (id) viewFolder(id)
  }

  const { action } = currentFolder
  const popupOpened = action !== undefined && action !== DELETE

  const closePopup = () => setCurrentFolder({})
  const openCreatePopup = () => setCurrentFolder({ folder: undefined, action: CREATE })

  const openRenamePopup = (id: string) => {
    const folder = findFolderById(allFolders, id)
    setCurrentFolder({ folder, action: RENAME })
  }

  const openDeletePopup = (id: string) => {
    const folder = findFolderById(allFolders, id)
    setCurrentFolder({ folder, action: DELETE })

    setMessageBox({
      isOpen: true,
      handleConfirm: confirmDelete,
      title: SURE_WANT_DELETE_FOLDER(currentFolder.folder?.name),
      buttons: ['Отмена', 'Удалить'],
    })

    function confirmDelete() {
      if (!folder) return

      deleteFolder(folder)
      setAlertBox({
        message: `Папка ${folder.name} удаленa`,
        icon: AlertBoxIcons.DELETE,
        isOpen: true,
      })
    }
  }

  return (
    <div className={styles.container}>
      {allFolders.map((folder) => {
        const { name, count, isMainFolder } = folder
        const active = activeFolderName === name
        return (
          <div
            key={name}
            data-id={name}
            className={cx(styles.folder, active && styles.activeFolder)}
            onClick={setActiveFolder}
          >
            <div className={styles.nameAndIcon}>
              {active ? (
                <IconFolderOpen className={styles.iconFolder} />
              ) : (
                <IconFolderClose className={styles.iconFolder} />
              )}
              <p className={cx('text_1_hl_1', styles.folderName)}>{name}</p>
            </div>
            <span className={cx(styles.count, active ? 'text_1_hl_2' : 'text_1')}>
              {reduceBigNumbers(count)}
            </span>

            {!isMainFolder && (
              <FolderContextMenu
                openRenamePopup={openRenamePopup}
                folderName={name}
                openDeletePopup={openDeletePopup}
              />
            )}
          </div>
        )
      })}

      <Button
        modificator={cx(buttonThemes.theme_additional, styles.btnAdd)}
        onClick={openCreatePopup}
      >
        <IconPlus />
        <span>Создать новую папку</span>
      </Button>

      <FolderPopup
        isOpen={popupOpened}
        close={closePopup}
        currentFolder={currentFolder}
        reducerName={reducerName}
      />
    </div>
  )
}
export default memo(Folders)
