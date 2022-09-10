import { FC } from 'react'
import cx from 'classnames'

import DropDown from 'components/parts/DropDown/DropDown'

import { Align } from 'constants/dictionary'
import { ICheckMenuConfig, CheckMenuAction } from 'types'
import { IconCopy, IconMoveToFolder, IconSend, IconTrash } from 'assets/icons'

import styles from './CheckMenu.module.scss'
import dropDownStyles from 'components/parts/DropDown/DropDown.module.scss'
import { MainReducerKeys } from 'store/data-types'
import useAllFolders from 'store/folders/useAllFolders'

const CheckMenuOption: FC<ICheckMenuConfig> = ({ handleClick, option, reducerName }) => {
  if (option === CheckMenuAction.COPY) return <CopyOption handleClick={handleClick} />
  if (option === CheckMenuAction.DELETE) return <DeleteOption handleClick={handleClick} />
  if (option === CheckMenuAction.SEND_TEST) return <SendOption handleClick={handleClick} />
  if (option === CheckMenuAction.MOVE_TO_FOLDER) return <MoveOption reducerName={reducerName} />
  return null
}

const CopyOption = ({ handleClick }: { handleClick?: () => void }) => {
  return (
    <button className={cx(styles.button, 'text_1_hl_1')} onClick={handleClick}>
      <IconCopy className={styles.buttonIcon} />
      Копировать
    </button>
  )
}

const DeleteOption = ({ handleClick }: { handleClick?: () => void }) => {
  return (
    <button className={cx(styles.button, 'text_1_hl_1', styles.alarm)} onClick={handleClick}>
      <IconTrash className={styles.buttonIcon} />
      Удалить
    </button>
  )
}

const SendOption = ({ handleClick }: { handleClick?: () => void }) => {
  return (
    <button className={cx(styles.button, 'text_1_hl_1')} onClick={handleClick}>
      <IconSend className={styles.buttonIcon} />
      Отправить тестовое письмо
    </button>
  )
}

const MoveOption = ({ reducerName }: { reducerName: MainReducerKeys | undefined }) => {
  const { allFolders, activeFolderId } = useAllFolders(reducerName || MainReducerKeys.audiences)

  const availableFolders = allFolders.filter(
    (folder) => !folder.isMainFolder && folder.id !== activeFolderId
  )

  return (
    <DropDown
      align={Align.BOTTOM_CENTER}
      triggerNode={
        <button className={cx(styles.button, 'text_1_hl_1')}>
          <IconMoveToFolder className={styles.buttonIcon} />
          Переместить в папку
        </button>
      }
    >
      <div className={dropDownStyles.container}>
        {availableFolders.map((folder, index) => (
          <button
            key={index}
            className={cx(dropDownStyles.element, dropDownStyles.dropDownOption, 'text_1')}
          >
            {folder.name}
          </button>
        ))}
      </div>
    </DropDown>
  )
}

export default CheckMenuOption
