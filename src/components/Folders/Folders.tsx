import { FC, useState, memo } from 'react'
import cx from 'classnames'

import Button from 'components/parts/Button/Button'
import MessageBox from 'components/MessageBox/MessageBox'
import FolderContextMenu from './FolderContextMenu'
import FolderPopup from './FolderPopup/FolderPopup'

import useAllFolders from 'store/folders/useAllFolders'
import useSetFolder from 'store/folders/useSetFolder'
import useToggle from 'hooks/useToggle'
import useAlertContext from 'context/AlertContext'

import { AlertBoxIcons } from 'constants/dictionary'
import { FolderAction, IFolder } from 'types'
import { findFolderById, reduceBigNumbers } from 'utils'

import { IconPlus, IconFolderOpen, IconFolderClose } from 'assets/icons'
import buttonThemes from 'components/parts/Button/ButtonThemes.module.scss'
import styles from './Folders.module.scss'

interface IFolders {
  config: IFolder[]
  storeKey?: string
}

export interface ICurrentFolder {
  folder?: IFolder
  action?: FolderAction
}

const { RENAME, CREATE, DELETE } = FolderAction

const makeMessageBoxTitle = (folderName: string) =>
  `Вы уверены, что хотите удалить папку ${folderName}?<br><br>Данные при этом утеряны не будут`

const Folders: FC<IFolders> = ({ config, storeKey }) => {
  const { allFolders } = useAllFolders() // storeKey
  const { activeFolderId, viewFolder, deleteFolder } = useSetFolder()
  const { setAlertBox } = useAlertContext()

  const [currentFolder, setCurrentFolder] = useState<ICurrentFolder>({})
  const [messageBoxShown, toggleMessageBox] = useToggle()

  const setActiveFolder = (e: React.MouseEvent<HTMLElement>) => {
    const { id } = e.currentTarget.dataset
    if (id) viewFolder(id)
  }

  const { action } = currentFolder
  const popupOpened = action !== undefined && action !== DELETE

  const closePopup = () => setCurrentFolder({})
  const openCreatePopup = () => setCurrentFolder({ action: CREATE })

  const openRenamePopup = (id: string) => {
    const folder = findFolderById(allFolders, id)
    setCurrentFolder({ folder, action: RENAME })
  }

  const openDeletePopup = (id: string) => {
    const folder = findFolderById(allFolders, id)
    setCurrentFolder({ folder, action: DELETE })
    toggleMessageBox()
  }

  const confirmDelete = () => {
    const { folder } = currentFolder
    if (folder) {
      deleteFolder(folder)
      toggleMessageBox()

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
        const { name, id, count } = folder
        const active = activeFolderId === id
        return (
          <div
            key={id}
            data-id={id}
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
            <FolderContextMenu
              openRenamePopup={openRenamePopup}
              folderId={id}
              openDeletePopup={openDeletePopup}
            />
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

      <FolderPopup isOpen={popupOpened} close={closePopup} currentFolder={currentFolder} />
      <MessageBox
        isOpen={messageBoxShown}
        close={toggleMessageBox}
        handleConfirm={confirmDelete}
        title={makeMessageBoxTitle(currentFolder.folder?.name || '')}
        buttons={['Отмена', 'Удалить']}
      />
    </div>
  )
}
export default memo(Folders)
