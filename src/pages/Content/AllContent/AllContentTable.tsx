import { FC } from 'react'
import { useHistory } from 'react-router-dom'
import cx from 'classnames'

import ScrollTable from 'components/Table/ScrollTable'
import useTable from 'components/Table/useTable'
import useAllContent from 'store/content/useAllContent'
import useAlertContext from 'context/AlertContext'
import useMessageBoxContext from 'context/MessageBoxContext'

import { SURE_WANT_DELETE_MANY } from 'constants/helpMessages'
import { AlertBoxIcons } from 'constants/dictionary'
import { ddmmyyyy } from 'utils/transformDate'
import { ContentTypeLabels, ContentTypes, IContent } from 'types/content'
import { CheckMenuAction } from 'types'
import { IconCheck } from 'assets/icons'
import { MainReducerKeys } from 'store/data-types'
import { PagesData } from 'constants/url'
import { decodeFileName } from 'utils'
import tableStyles from 'components/Table/TableBase.module.scss'
import { useSendHTMLPopup } from '../ContentHTML/useSendHTMLPopup'
import ContentPopup from '../components/ContentPopup/ContentPopup'

const header = ['', 'Название', 'Тип', 'Дата создания', 'Дата изменения']

const getAllContentIds = (allContent: IContent[]) => allContent.map(({ id }) => id) as string[]

const AllContentTable: FC<{ allContent: IContent[] }> = ({ allContent }) => {
  const history = useHistory()
  // const { deleteMultipleById } = useAllContent()
  const { setAlertBox } = useAlertContext()
  const { setMessageBox } = useMessageBoxContext()
  const { popUpIsOpen, emails, setEmails, togglePopUp, sendEmailsMany } = useSendHTMLPopup()

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
    if (type === ContentTypes.HTML) url = PagesData.CONTENT_HTML.link
    else if (type === ContentTypes.SMS) url = PagesData.CONTENT_SMS.link
    // else url = PagesData.CONTENT_FILE.link

    history.push(`${url}/${id}`)
  }

  const sendTestEmail = async () => {
    await sendEmailsMany(checkedList)
    clearChecks()
  }

  const deleteContent = () => {
    setMessageBox({
      isOpen: true,
      handleConfirm,
      title: SURE_WANT_DELETE_MANY(checkedCount),
      buttons: ['Отмена', 'Удалить'],
    })

    function handleConfirm() {
      // deleteMultipleById(checkedList)
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
      handleClick: togglePopUp,
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
    <>
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
          const { id, type, createdAt, updatedAt, originalName } = contentItem
          const checked = isItChecked(id)

          const title = decodeFileName(originalName)
          const typeToShow = ContentTypeLabels[type]
          const createdDate = ddmmyyyy(createdAt)
          const updatedDate = ddmmyyyy(updatedAt)

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
                <div className={cx(tableStyles.check, { [tableStyles.checked]: checked })}>
                  {checked && <IconCheck />}
                </div>
              </div>

              <div className={cx(tableStyles.cell, tableStyles.accentCell, 'text_1_hl_1')}>
                <span>{title}</span>
              </div>
              <div className={cx(tableStyles.cell, 'text_1')}>{typeToShow}</div>
              <div className={cx(tableStyles.cell, 'text_1')}>{createdDate}</div>
              <div className={cx(tableStyles.cell, 'text_1')}>{updatedDate}</div>
            </div>
          )
        })}
      </ScrollTable>

      {popUpIsOpen && (
        <ContentPopup
          close={togglePopUp}
          subtitle="Email"
          placeholder="Введите email"
          btnAddText="Добавить email"
          inputsState={emails}
          setInputsState={setEmails}
          handleSend={sendTestEmail}
        />
      )}
    </>
  )
}

export default AllContentTable
