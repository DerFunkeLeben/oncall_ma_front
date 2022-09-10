import { FC } from 'react'
import { useHistory } from 'react-router-dom'
import cx from 'classnames'

import ScrollTable from 'components/Table/ScrollTable'
import useTable from 'components/Table/useTable'
import useAllContent from 'store/content/useAllContent'
import useAlertContext from 'context/AlertContext'
import useMessageBoxContext from 'context/MessageBoxContext'

import { CONTENT_URL_HTML, CONTENT_URL_SMS, CONTENT_URL_FILE } from 'constants/url'
import { SURE_WANT_DELETE_MANY } from 'constants/helpMessages'
import { AlertBoxIcons } from 'constants/dictionary'
import { ddmmyyyy } from 'utils/transformDate'
import { ContentTypes, IContent } from 'types/content'
import { CheckMenuAction } from 'types'
import { IconCheck } from 'assets/icons'
import tableStyles from 'components/Table/TableBase.module.scss'
import { MainReducerKeys } from 'store/data-types'

const header = ['', 'Название', 'Тип', 'Дата создания', 'Дата изменения']

const getAllContentIds = (allContent: IContent[]) => allContent.map(({ id }) => id) as string[]

const AllContentTable: FC<{ allContent: IContent[] }> = ({ allContent }) => {
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

  const openContent = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    const { id, type } = e.currentTarget.dataset

    let url
    if (type === ContentTypes.HTML) url = CONTENT_URL_HTML
    else if (type === ContentTypes.SMS) url = CONTENT_URL_SMS
    else url = CONTENT_URL_FILE

    history.push(`${url}/${id}`)
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
        const { id, title, type, createDate, lastUpdateDate } = contentItem
        const checked = isItChecked(id)
        return (
          <div
            className={tableStyles.row}
            key={index}
            onClick={openContent}
            data-id={id}
            data-type={type}
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
              <span>{title}</span>
            </div>
            <div className={cx(tableStyles.cell, 'text_1')}>{type}</div>
            <div className={cx(tableStyles.cell, 'text_1')}>{ddmmyyyy(createDate)}</div>
            <div className={cx(tableStyles.cell, 'text_1')}>{ddmmyyyy(lastUpdateDate)}</div>
          </div>
        )
      })}
    </ScrollTable>
  )
}

export default AllContentTable
