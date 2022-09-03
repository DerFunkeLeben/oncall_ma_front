import { ChangeEvent, FC, useState } from 'react'
import { v4 as uuid } from 'uuid'
import cx from 'classnames'

import InputBase from 'components/parts/InputBase/InputBase'
import Button from 'components/parts/Button/Button'
import Popup from 'containers/Popup/Popup'

import useDidUpdateEffect from 'hooks/useDidUpdateEffect'
import useSetFolder from 'store/folders/useSetFolder'
import { FolderAction } from 'types'
import { ICurrentFolder } from '../Folders'

import styles from './FolderPopup.module.scss'
import buttonThemes from 'components/parts/Button/ButtonThemes.module.scss'

interface IFolderPopup {
  isOpen: boolean
  close: () => void
  currentFolder: ICurrentFolder
}

const { RENAME, CREATE } = FolderAction

const FolderPopup: FC<IFolderPopup> = ({ isOpen, close, currentFolder }) => {
  const { folder, action } = currentFolder

  const [folderName, setFolderName] = useState<string>('')
  const { createFolder, renameFolder } = useSetFolder()

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFolderName(event.target.value)
  }

  const handleConfirm = () => {
    if (action === RENAME && folder) renameFolder({ ...folder, name: folderName })
    if (action === CREATE)
      createFolder({
        count: 0,
        name: folderName,
        id: uuid(),
      })

    setFolderName('')
    close()
  }

  let title, button
  if (action === CREATE) {
    title = 'Создать папку'
    button = 'Создать папку'
  } else {
    title = 'Переименовать папку'
    button = 'Сохранить'
  }

  useDidUpdateEffect(() => {
    if (action === RENAME && folder) setFolderName(folder.name)
    if (action === CREATE) setFolderName('')
  }, [folder])

  return (
    <Popup isOpen={isOpen} close={close}>
      <div className={cx(styles.wrapper)}>
        <div className={cx(styles.title, 'header_2')}>{title}</div>
        <InputBase
          placeholder={'Введите название'}
          value={folderName}
          handleInputChange={handleInputChange}
          modificator={styles.input}
        />
        <div className={cx(styles.btnsWrap)}>
          <Button onClick={handleConfirm}>{button}</Button>
          <Button modificator={buttonThemes.theme_secondary} onClick={close}>
            Отменить
          </Button>
        </div>
      </div>
    </Popup>
  )
}

export default FolderPopup
