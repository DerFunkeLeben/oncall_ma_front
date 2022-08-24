import { FC, useState } from 'react'
import cx from 'classnames'

import { IFolderConfig } from 'types'

import { IconFolderOpen, IconFolderClose } from 'assets/icons'
import styles from './Folders.module.scss'

interface IFolders {
  config: IFolderConfig[]
}

const Folders: FC<IFolders> = ({ config }) => {
  const [activeFolderId, setActiveFolderId] = useState('61')

  const setActiveFolder = (e: React.MouseEvent<HTMLElement>) => {
    const { id } = e.currentTarget.dataset
    if (id) setActiveFolderId(id)
  }

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
              <p className={cx('text_1_hl_1')}>{name}</p>
            </div>
            <span className={cx(styles.count, active ? 'text_1_hl_2' : 'text_1')}>{count}</span>
          </div>
        )
      })}
    </div>
  )
}
export default Folders
