import { FC } from 'react'
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
import { foldersConfig } from './allContentData'
import { CONTENT_URL_HTML, CONTENT_URL_SMS, CONTENT_URL_FILE } from 'constants/url'

import { ddmmyyyy } from '../../../utils/transformDate'
import { IPageData } from 'types'
import { ContentTypes } from 'types/content'

import { IconCheck, IconSend, IconTrash } from 'assets/icons'
import styles from './AllContent.module.scss'
import tableStyles from 'components/Table/TableBase.module.scss'
import dropDownStyles from 'components/parts/DropDown/DropDown.module.scss'
import { getContentById } from 'utils/content'

const header = ['', 'Название', 'Тип', 'Дата создания', 'Дата изменения']
const menuIsOpen = true

const createOptions = [
  { title: 'Создать HTML', url: CONTENT_URL_HTML },
  { title: 'Создать SMS', url: CONTENT_URL_SMS },
  { title: 'Создать File', url: CONTENT_URL_FILE },
]

const AllContent: FC<IPageData> = () => {
  const history = useHistory()
  const { allContent } = useAllContent()
  const { setCurrentContent } = useCurrentContent()

  const totalCountOfData = allContent.length
  const { toggleCheck, isItChecked, checkedCount, checkedAll, toggleAllChecks } =
    useTable(totalCountOfData)

  const openContent = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    const { id, type } = e.currentTarget.dataset

    let url
    if (type === ContentTypes.HTML) url = CONTENT_URL_HTML
    else if (type === ContentTypes.SMS) url = CONTENT_URL_SMS
    else url = CONTENT_URL_FILE

    const content = getContentById(allContent, id)
    setCurrentContent({ content, contentAction: null })

    history.push(`${url}/${id}`)
  }

  const sendTestEmail = () => console.log('sendTestEmail')
  const deleteContent = () => console.log('handleDeleteAudience')

  const checkMenuConfig = [
    {
      caption: 'Отправить тестовое письмо',
      Icon: IconSend,
      handleClick: sendTestEmail,
    },
    {
      caption: 'Удалить',
      Icon: IconTrash,
      handleClick: deleteContent,
      modificators: ['alarm'],
    },
  ]

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
        <Folders config={foldersConfig} />
        <div className={styles.tableWrapper}>
          <ScrollTable
            headers={header}
            handleScrollLimit={() => console.log('handleScrollLimit')}
            {...{ checkedCount, checkedAll, totalCountOfData, checkMenuConfig, toggleAllChecks }}
          >
            {allContent.map((dataRow, index) => {
              const { id, title, type, createDate, lastUpdateDate } = dataRow
              const checked = isItChecked(index)
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
                    data-id={index}
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
