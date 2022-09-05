import { FC, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import cx from 'classnames'

import ScrollTable from 'components/Table/ScrollTable'
import MessageBox from 'components/MessageBox/MessageBox'
import useTable from 'components/Table/useTable'
import useAllContent from 'store/content/useAllContent'
import useAlertContext from 'context/AlertContext'
import useMessageBoxContext from 'context/MessageBoxContext'

import { CONTENT_URL_HTML, CONTENT_URL_SMS, CONTENT_URL_FILE } from 'constants/url'
import { AlertBoxIcons } from 'constants/dictionary'
import { ddmmyyyy } from 'utils/transformDate'
import { ContentTypes } from 'types/content'
import { IconCheck, IconSend, IconTrash } from 'assets/icons'
import tableStyles from 'components/Table/TableBase.module.scss'

const header = ['', 'Название', 'Тип', 'Дата создания', 'Дата изменения']
const makeMessageBoxTitle = (checkedCount: number) =>
  `Вы уверены, что хотите удалить ${checkedCount} элементов?`

const AllContentTable: FC = () => {
  const history = useHistory()
  const { allContent, allContentIds, deleteMultipleById } = useAllContent()
  const { setAlertBox } = useAlertContext()

  const {
    checkedList,
    toggleCheck,
    isItChecked,
    checkedCount,
    checkedAll,
    toggleAllChecks,
    clearChecks,
  } = useTable(allContentIds)
  const { setMessageBox } = useMessageBoxContext()

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

  const confirmDelete = () => {
    deleteMultipleById(checkedList)
    setAlertBox({
      message: `Удалено элементов: ${checkedCount}`,
      icon: AlertBoxIcons.DELETE,
      isOpen: true,
    })
    clearChecks()
  }

  const checkMenuConfig = [
    {
      caption: 'Отправить тестовое письмо',
      Icon: IconSend,
      handleClick: sendTestEmail,
    },
    {
      caption: 'Удалить',
      Icon: IconTrash,
      modificators: ['alarm'],
      handleClick: () =>
        setMessageBox({
          isOpen: true,
          handleConfirm: confirmDelete,
          title: makeMessageBoxTitle(checkedCount),
          buttons: ['Отмена', 'Удалить'],
        }),
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
