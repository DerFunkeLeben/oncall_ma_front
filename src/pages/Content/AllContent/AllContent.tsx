import { FC, useState } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import cx from 'classnames'

import PageHead from 'components/PageHead/PageHead'
import Button from 'components/parts/Button/Button'
import DropDown from 'components/parts/DropDown/DropDown'
import ScrollTable from 'components/Table/ScrollTable'
import Folders from 'components/Folders/Folders'
import InputBase from 'components/parts/InputBase/InputBase'
import useTable from 'components/Table/useTable'

import { IconCheck, IconSend, IconTrash } from 'assets/icons'
import { data, foldersConfig } from './allContentData'
import { IPageData } from 'types'

import styles from './AllContent.module.scss'
import tableStyles from 'components/Table/TableBase.module.scss'
import dropDownStyles from 'components/parts/DropDown/DropDown.module.scss'

const header = ['', 'Название', 'Тип', 'Дата создания', 'Дата изменения']
const menuIsOpen = true

const createOptions = [
  { title: 'Создать HTML', url: 'create_html' },
  { title: 'Создать SMS', url: 'create_sms' },
  { title: 'Создать File', url: 'create_file' },
]

const AllContent: FC<IPageData> = () => {
  const history = useHistory()
  const { url } = useRouteMatch()
  const { toggleCheck, isItChecked, checkedCount } = useTable()

  const totalCountOFData = data.length

  const openContent = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    const { id } = e.currentTarget.dataset
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
                  onClick={() => history.push(`${url}/${createOption.url}`)}
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
            checkedCount={checkedCount}
            totalCountOfData={totalCountOFData}
            checkMenuConfig={checkMenuConfig}
          >
            {data.map((dataRow, index) => {
              const { id, name, type, create_date, last_update_date } = dataRow
              const checked = isItChecked(index)
              return (
                <div className={tableStyles.row} key={index} onClick={openContent} data-id={id}>
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
                    <span>{name}</span>
                  </div>
                  <div className={cx(tableStyles.cell, 'text_1')}>{type}</div>
                  <div className={cx(tableStyles.cell, 'text_1')}>{create_date}</div>
                  <div className={cx(tableStyles.cell, 'text_1')}>{last_update_date}</div>
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
