import { FC } from 'react'
import { useHistory } from 'react-router-dom'
import cx from 'classnames'

import ScrollTable from 'components/Table/ScrollTable'
import useTable from 'components/Table/useTable'
import useAllContent from 'store/content/useAllContent'
import useAlertContext from 'context/AlertContext'
import useMessageBoxContext from 'context/MessageBoxContext'

import { CREATE_SCENARIO } from 'constants/url'
import { SURE_WANT_DELETE_MANY } from 'constants/helpMessages'
import { AlertBoxIcons } from 'constants/dictionary'
import { ddmmyyyy } from 'utils/transformDate'
import { ContentTypes, IContent } from 'types/content'
import { CheckMenuAction, IAllScenaries } from 'types'
import { IconCheck } from 'assets/icons'
import tableStyles from 'components/Table/TableBase.module.scss'
import { MainReducerKeys } from 'store/data-types'

const header = ['', 'Название', 'Тип', 'Дата создания']

const getAllContentIds = (allContent: IAllScenaries) => allContent.map(({ id }) => id) as string[]

const AllScenariosTable: FC<{ allContent: IAllScenaries }> = ({ allContent }) => {
  const history = useHistory()
  const { deleteMultipleById } = useAllContent()
  const { setAlertBox } = useAlertContext()
  const { setMessageBox } = useMessageBoxContext()

  const allContentIds = getAllContentIds(allContent)

  const {
    checkedList,
    toggleCheck,
    isItChecked,
    checkedCount,
    checkedAll,
    toggleAllChecks,
    clearChecks,
  } = useTable(allContentIds)

  const totalCountOfData = allContent.length

  const openScenario = (e: React.MouseEvent<HTMLElement>) => {
    // e.stopPropagation()
    // const { id, type } = e.currentTarget.dataset
    // const url = CREATE_SCENARIO
    // history.push(`${url}/${id}`)
  }

  const sendTestEmail = () => console.log('sendTestEmail')

  const deleteContent = () => {
    setMessageBox({
      isOpen: true,
      handleConfirm,
      title: SURE_WANT_DELETE_MANY(checkedCount),
      buttons: ['Отмена', 'Удалить'],
    })

    function handleConfirm() {
      deleteMultipleById(checkedList)
      setAlertBox({
        message: `Удалено элементов: ${checkedCount}`,
        icon: AlertBoxIcons.DELETE,
        isOpen: true,
      })
      clearChecks()
    }
  }

  const checkMenuConfig = [
    {
      option: CheckMenuAction.SEND_TEST,
      handleClick: sendTestEmail,
    },
    {
      option: CheckMenuAction.MOVE_TO_FOLDER,
      reducerName: MainReducerKeys.content,
    },
    {
      option: CheckMenuAction.DELETE,
      handleClick: deleteContent,
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
      {allContent.map((contentItem, index) => {
        const { id, start } = contentItem
        if (!contentItem?.events?.[start]?.properties) return
        const { startDate, scenarioType } = contentItem.events[start].properties
        const checked = isItChecked(id)
        return (
          <div
            className={tableStyles.row}
            key={index}
            onClick={openScenario}
            data-id={id}
            data-type={scenarioType}
          >
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
              <span>{'title'}</span>
            </div>
            <div className={cx(tableStyles.cell, 'text_1')}>{scenarioType}</div>
            <div className={cx(tableStyles.cell, 'text_1')}>{ddmmyyyy(new Date(startDate))}</div>
            {/* <div className={cx(tableStyles.cell, 'text_1')}>{ddmmyyyy(lastUpdateDate)}</div> */}
          </div>
        )
      })}
    </ScrollTable>
  )
}

export default AllScenariosTable
