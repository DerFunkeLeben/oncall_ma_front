import { ChangeEvent, FC, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import cx from 'classnames'

import InputBase from 'components/parts/InputBase/InputBase'
import Button from 'components/parts/Button/Button'
import Popup from 'containers/Popup/Popup'

import useDidUpdateEffect from 'hooks/useDidUpdateEffect'
import useSetFolder from 'store/folders/useSetFolder'
import useAllFolders from 'store/folders/useAllFolders'
import { getFolderNameMatch } from 'store/folders/utils'
import { MainReducerKeys } from 'store/data-types'
import { FolderAction } from 'types'
import { ICurrentFolder } from '../Folders'

import styles from './FolderPopup.module.scss'
import buttonThemes from 'components/parts/Button/ButtonThemes.module.scss'
import inputStyles from 'components/parts/InputBase/InputBase.module.scss'
import useAlertContext from 'context/AlertContext'
import { AlertBoxIcons } from 'constants/dictionary'
import ValidationError from 'constants/ValidationError'

interface IFolderPopup {
  isOpen: boolean
  close: () => void
  currentFolder: ICurrentFolder
  reducerName: MainReducerKeys
}

const { RENAME, CREATE } = FolderAction

const FolderPopup: FC<IFolderPopup> = ({ isOpen, close, currentFolder, reducerName }) => {
  const { folder, action } = currentFolder

  const [folderName, setFolderName] = useState<string>(folder?.name || '')
  const [folderError, setFolderError] = useState<string>('')

  const { allFolders } = useAllFolders(reducerName)
  const { createFolder, renameFolder } = useSetFolder(reducerName)
  const { setAlertBox } = useAlertContext()

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFolderName(event.target.value)
    if (folderError) setFolderError('')
  }

  const handleConfirm = () => {
    if (!folderName) return setFolderError(ValidationError.FOLDER_NO_NAME)

    const folderAlreadyExists = getFolderNameMatch(allFolders, folderName, folder?.id)
    if (folderAlreadyExists) return setFolderError(ValidationError.FOLDER_ALREADY_EXISTS)

    if (action === RENAME && folder) {
      renameFolder({ ...folder, name: folderName })
      setAlertBox({
        message: `Папка ${folderName} успешно переименована`,
        icon: AlertBoxIcons.SUCCESS,
        isOpen: true,
      })
    }
    if (action === CREATE) {
      createFolder({
        count: 0,
        name: folderName,
        id: uuid(),
      })
      setAlertBox({
        message: `Создана папка ${folderName}`,
        icon: AlertBoxIcons.SUCCESS,
        isOpen: true,
      })
    }

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

  useEffect(() => {
    setFolderError(() => '')
    if (action === RENAME && folder) setFolderName(() => folder.name)
    if (action === CREATE) setFolderName(() => '')
  }, [action])

  return (
    <Popup isOpen={isOpen} close={close}>
      <div className={cx(styles.wrapper)}>
        <div className={cx(styles.title, 'header_2')}>{title}</div>
        <InputBase
          placeholder={'Введите название'}
          value={folderName}
          handleInputChange={handleInputChange}
          modificator={cx(styles.input, {
            [inputStyles.inputError]: Boolean(folderError),
          })}
        />
        <div className={cx(styles.errorMessage, 'text_05')}>{folderError}</div>
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
