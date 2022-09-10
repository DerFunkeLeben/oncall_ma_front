import { FC } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import cx from 'classnames'
import ScrollTable from 'components/Table/ScrollTable'
import useTable from 'components/Table/useTable'
import useMessageBoxContext from 'context/MessageBoxContext'
import useAlertContext from 'context/AlertContext'
import { SURE_WANT_DELETE_MANY } from 'constants/helpMessages'
import tableStyles from 'components/Table/TableBase.module.scss'
import { CheckMenuAction } from 'types'
import { IconCheck } from 'assets/icons'
import { AlertBoxIcons } from 'constants/dictionary'
import { IAudienceMetaData } from 'types/audience'
import { data } from '../audiencesData'
import { MainReducerKeys } from 'store/data-types'

const totalCountOfData = data.length

const header = ['', 'Название', 'Количество контактов', 'Дата создания', 'Дата изменения']
const allIds = data.map((el) => el.id)

export const AllAudiencesTable: FC<{ allAudiencesData: IAudienceMetaData[] }> = ({
  allAudiencesData,
}) => {
  const history = useHistory()
  const { url } = useRouteMatch()
  const { setMessageBox } = useMessageBoxContext()
  const { setAlertBox } = useAlertContext()
  const { toggleCheck, isItChecked, checkedCount, checkedAll, toggleAllChecks, clearChecks } =
    useTable(allIds)

  const openAudience = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    const { id } = e.currentTarget.dataset
    history.push(`${url}/${id}`)
  }

  const deleteAudience = () => {
    setMessageBox({
      isOpen: true,
      handleConfirm: confirmDelete,
      title: SURE_WANT_DELETE_MANY(checkedCount),
      buttons: ['Отмена', 'Удалить'],
    })
  }

  const copyAudience = () => console.log('handleCopyAudience')
  const confirmDelete = () => {
    console.log('DO DELETE') // TODO
    clearChecks()
    setAlertBox({
      isOpen: true,
      message: `Удалено элементов: ${checkedCount}`,
      icon: AlertBoxIcons.DELETE,
    })
  }

  const checkMenuConfig = [
    {
      option: CheckMenuAction.COPY,
      handleClick: copyAudience,
    },
    {
      option: CheckMenuAction.MOVE_TO_FOLDER,
      reducerName: MainReducerKeys.audiences,
    },
    {
      option: CheckMenuAction.DELETE,
      handleClick: deleteAudience,
    },
  ]

  return (
    <ScrollTable
      headers={header}
      handleScrollLimit={() => console.log('handleScrollLimit')}
      {...{
        checkedCount,
        checkedAll,
        totalCountOfData,
        checkMenuConfig,
        toggleAllChecks,
      }}
    >
      {allAudiencesData.map((dataRow, index) => {
        const { id, name, contact_count, create_date, last_update_date } = dataRow
        const checked = isItChecked(id)
        return (
          <div className={tableStyles.row} key={index} onClick={openAudience} data-id={id}>
            <div
              className={cx(tableStyles.cell, tableStyles.cellCheck)}
              onClick={toggleCheck}
              data-id={id}
            >
              <div
                className={cx(tableStyles.check, {
                  [tableStyles.checked]: checked,
                })}
              >
                {checked && <IconCheck />}
              </div>
            </div>
            <div className={cx(tableStyles.cell, tableStyles.accentCell, 'text_1_hl_1')}>
              <span>{name}</span>
            </div>
            <div className={cx(tableStyles.cell, 'text_1')}>{contact_count}</div>
            <div className={cx(tableStyles.cell, 'text_1')}>{create_date}</div>
            <div className={cx(tableStyles.cell, 'text_1')}>{last_update_date}</div>
          </div>
        )
      })}
    </ScrollTable>
  )
}
