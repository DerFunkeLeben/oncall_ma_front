import { FC, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import cx from 'classnames'

import PageHead from 'components/PageHead/PageHead'
import Button from 'components/parts/Button/Button'
import DropDown from 'components/parts/DropDown/DropDown'
import ScrollTable from 'components/Table/ScrollTable'
import Folders from 'components/Folders/Folders'
import InputBase from 'components/parts/InputBase/InputBase'
import useTable from 'components/Table/useTable'

import useAllContent from 'store/content/useAllContent'
import useCurrentContent from 'store/content/useCurrentContent'
import useSetContent from 'store/content/useSetContent'

import { foldersConfig } from './allContentData'
import { CONTENT_URL_HTML, CONTENT_URL_SMS, CONTENT_URL_FILE } from 'constants/url'
import { ContentAction } from 'constants/content'

import { ddmmyyyy } from '../../../utils/transformDate'
import { getContentById } from 'utils/content'
import { IPageData } from 'types'
import { ContentTypes } from 'types/content'

import { IconCheck, IconSend, IconTrash } from 'assets/icons'
import styles from './AllContent.module.scss'
import tableStyles from 'components/Table/TableBase.module.scss'
import dropDownStyles from 'components/parts/DropDown/DropDown.module.scss'

const header = ['', 'Название', 'Тип', 'Дата создания', 'Дата изменения']
const menuIsOpen = true

const createOptions = [
  { title: 'Создать HTML', url: CONTENT_URL_HTML },
  { title: 'Создать SMS', url: CONTENT_URL_SMS },
  { title: 'Создать File', url: CONTENT_URL_FILE },
]

const AllContent: FC<IPageData> = () => {
  const history = useHistory()
  const { allContent, allContentIds } = useAllContent()
  const { setCurrentContent } = useCurrentContent()
  const { deleteMultipleById } = useSetContent()

  const totalCountOfData = allContent.length

  const {
    checkedList,
    toggleCheck,
    isItChecked,
    checkedCount,
    checkedAll,
    toggleAllChecks,
    clearChecks,
  } = useTable(allContentIds)

  const openContent = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    const { id, type } = e.currentTarget.dataset

    let url
    if (type === ContentTypes.HTML) url = CONTENT_URL_HTML
    else if (type === ContentTypes.SMS) url = CONTENT_URL_SMS
    else url = CONTENT_URL_FILE

    const content = getContentById(allContent, id)
    setCurrentContent({ content, contentAction: ContentAction.EDIT })

    history.push(`${url}/${id}`)
  }

  const sendTestEmail = () => console.log('sendTestEmail')

  const checkMenuConfig = [
    {
      caption: 'Отправить тестовое письмо',
      Icon: IconSend,
      handleClick: sendTestEmail,
    },
    {
      caption: 'Удалить',
      Icon: IconTrash,
      handleClick: () => {
        deleteMultipleById(checkedList)
        clearChecks()
      },
      modificators: ['alarm'],
    },
  ]

  useEffect(() => {
    setCurrentContent({ content: undefined, contentAction: ContentAction.CREATE })
  }, [])

  return (
    <>
      <div className={cx(styles.pageContent, { [styles.menuIsOpen]: menuIsOpen })}>
        <PageHead
          title="Контент"
          separateBlock={
            <InputBase
              placeholder="Поиск по названию"
              icon={true}
              handleInputChange={() => console.log('asd')}
            />
          }
        >
          <DropDown
            alignRight={true}
            triggerNode={
              <Button>
                <span>Создать</span>
              </Button>
            }
          >
            <div className={dropDownStyles.container}>
              {createOptions.map((createOption, index) => (
                <button
                  className={cx(dropDownStyles.element, 'text_1')}
                  onClick={() => history.push(createOption.url)}
                  key={index}
                >
                  {createOption.title}
                </button>
              ))}
            </div>
          </DropDown>
        </PageHead>
        <Folders config={foldersConfig} storeKey={'content'} />
        <div className={styles.tableWrapper}>
          <ScrollTable
            headers={header}
            handleScrollLimit={() => console.log('handleScrollLimit')}
            {...{ checkedCount, checkedAll, totalCountOfData, checkMenuConfig, toggleAllChecks }}
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
        </div>
      </div>
    </>
  )
}

export default AllContent
