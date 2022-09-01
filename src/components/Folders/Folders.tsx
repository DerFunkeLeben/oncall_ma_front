import { FC, useState } from 'react'
import cx from 'classnames'

import Button from 'components/parts/Button/Button'
import FolderContextMenu from './FolderContextMenu'

import { IFolder } from 'types'
import { reduceBigNumbers } from 'utils'

import { IconPlus, IconFolderOpen, IconFolderClose } from 'assets/icons'
import buttonThemes from 'components/parts/Button/ButtonThemes.module.scss'
import styles from './Folders.module.scss'

interface IFolders {
  config: IFolder[]
}

const Folders: FC<IFolders> = ({ config }) => {
  const [activeFolderId, setActiveFolderId] = useState('61')

  const setActiveFolder = (e: React.MouseEvent<HTMLElement>) => {
    const { id } = e.currentTarget.dataset
    if (id) setActiveFolderId(id)
  }

  const handleNewFolder = () => console.log(1)

  return (
    <div className={styles.container}>
      {config.map((folder) => {
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
            <FolderContextMenu />
          </div>
        )
      })}

      <Button
        modificator={cx(buttonThemes.theme_additional, styles.btnAdd)}
        onClick={handleNewFolder}
      >
        <IconPlus />
        <span>Создать новую папку</span>
      </Button>
    </div>
  )
}
export default Folders
