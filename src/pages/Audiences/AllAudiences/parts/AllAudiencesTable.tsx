import { FC } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import cx from 'classnames'

import ScrollTable from 'components/Table/ScrollTable'
import useTable from 'components/Table/useTable'
import useMessageBoxContext from 'context/MessageBoxContext'
import useAlertContext from 'context/AlertContext'
import { SURE_WANT_DELETE_MANY } from 'constants/helpMessages'
import { AlertBoxIcons } from 'constants/dictionary'
import { CheckMenuAction } from 'types'
import { IAudienceMetaData } from 'types/audience'
import { MainReducerKeys } from 'store/data-types'
import { ddmmyyyy } from 'utils/transformDate'
import { getIds } from 'utils'

import { IconCheck } from 'assets/icons'
import tableStyles from 'components/Table/TableBase.module.scss'

const header = ['', 'Название', 'Количество контактов', 'Дата создания', 'Дата изменения']

export const AllAudiencesTable: FC<{
  allAudiencesData: IAudienceMetaData[]
  deleteAudiences: (ids: string[]) => void
  copyAudiences: (ids: string[]) => void
}> = ({ allAudiencesData, deleteAudiences, copyAudiences }) => {
  const history = useHistory()
  const { url } = useRouteMatch()
  const { setMessageBox } = useMessageBoxContext()
  const { setAlertBox } = useAlertContext()

  const allIds = getIds(allAudiencesData)

  const {
    toggleCheck,
    isItChecked,
    checkedCount,
    checkedAll,
    toggleAllChecks,
    clearChecks,
    checkedList,
  } = useTable(allIds)

  const openAudience = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    const { id } = e.currentTarget.dataset
    history.push(`${url}/${id}`)
  }

  const handleDeleteAudience = () => {
    setMessageBox({
      isOpen: true,
      handleConfirm: confirmDelete,
      title: SURE_WANT_DELETE_MANY(checkedCount),
      buttons: ['Отмена', 'Удалить'],
    })
  }

  const confirmDelete = () => {
    deleteAudiences(checkedList)
    clearChecks()
    setAlertBox({
      isOpen: true,
      message: `Удалено элементов: ${checkedCount}`,
      icon: AlertBoxIcons.DELETE,
    })
  }

  const handleCopyAudience = () => {
    copyAudiences(checkedList)
    clearChecks()
    setAlertBox({
      isOpen: true,
      message: `Выбранные аудитории скопированы`,
      icon: AlertBoxIcons.SUCCESS,
    })
  }

  const checkMenuConfig = [
    {
      option: CheckMenuAction.COPY,
      handleClick: handleCopyAudience,
    },
    {
      option: CheckMenuAction.MOVE_TO_FOLDER,
      reducerName: MainReducerKeys.audiences,
    },
    {
      option: CheckMenuAction.DELETE,
      handleClick: handleDeleteAudience,
    },
  ]

  return (
    <ScrollTable
      headers={header}
      handleScrollLimit={() => console.log('handleScrollLimit')}
      {...{
        checkedCount,
        checkedAll,
        totalCountOfData: allIds.length,
        checkMenuConfig,
        toggleAllChecks,
      }}
    >
      {allAudiencesData.map((dataRow, index) => {
        const { id, name, peoplecount, createdat, updatedat } = dataRow
        const checked = isItChecked(id)
        return (
          <div className={tableStyles.row} key={index} onClick={openAudience} data-id={id}>
            <div
              className={cx(tableStyles.cell, tableStyles.cellCheck)}
              onClick={toggleCheck}
              data-id={id}
            >
              <div className={cx(tableStyles.check, { [tableStyles.checked]: checked })}>
                {checked && <IconCheck />}
              </div>
            </div>
            <div className={cx(tableStyles.cell, tableStyles.accentCell, 'text_1_hl_1')}>
              <span>{name}</span>
            </div>
            <div className={cx(tableStyles.cell, 'text_1')}>{peoplecount}</div>
            <div className={cx(tableStyles.cell, 'text_1')}>{ddmmyyyy(createdat)}</div>
            <div className={cx(tableStyles.cell, 'text_1')}>{ddmmyyyy(updatedat)}</div>
          </div>
        )
      })}
    </ScrollTable>
  )
}
