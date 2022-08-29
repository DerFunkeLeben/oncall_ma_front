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

import styles from './AllAudiences.module.scss'
import buttonStyles from 'components/parts/Button/ButtonThemes.module.scss'
import tableStyles from 'components/Table/TableBase.module.scss'
import dropDownStyles from 'components/parts/DropDown/DropDown.module.scss'

import { IPageData } from 'types'
import { IconCheck, IconUpload, IconCopy, IconTrash } from 'assets/icons'

import { data, foldersConfig } from './audiencesData'
import PopupOfCreationFromExist from './PopupOfCreationFromExist/PopupOfCreationFromExist'

const header = ['', 'ID', 'Название', 'Количество контактов', 'Дата создания', 'Дата изменения']
const menuIsOpen = true
const totalCountOfData = data.length

const AllAudiences: FC<IPageData> = () => {
  const history = useHistory()
  const { url } = useRouteMatch()
  const { toggleCheck, isItChecked, checkedCount, checkedAll, toggleAllChecks } =
    useTable(totalCountOfData)

  const [popupCreateFromExistIsOpen, setPopupCreateFromExist] = useState(false)

  const openAudience = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    const { id } = e.currentTarget.dataset
    history.push(`${url}/${id}`)
  }

  const closePopupCreateFromExist = () => setPopupCreateFromExist(false)
  const copenPopupCreateFromExist = () => setPopupCreateFromExist(true)

  const copyAudience = () => console.log('handleCopyAudience')
  const deleteAudience = () => console.log('handleDeleteAudience')

  const checkMenuConfig = [
    {
      caption: 'Копировать',
      Icon: IconCopy,
      handleClick: copyAudience,
    },
    {
      caption: 'Удалить',
      Icon: IconTrash,
      handleClick: deleteAudience,
      modificators: ['alarm'],
    },
  ]

  return (
    <>
      <div className={cx(styles.pageContent, { [styles.menuIsOpen]: menuIsOpen })}>
        <PageHead
          title="Аудитории"
          separateBlock={
            <InputBase
              placeholder="Поиск по названию"
              icon={true}
              handleInputChange={() => console.log('asd')}
            />
          }
        >
          <Button modificator={buttonStyles.theme_secondary}>
            <IconUpload />
            <span>Загрузить аудиторию</span>
          </Button>
          <DropDown
            alignRight={true}
            triggerNode={
              <Button>
                <span>Создать аудиторию</span>
              </Button>
            }
          >
            <div className={dropDownStyles.container}>
              <button
                className={cx(dropDownStyles.element, 'text_1')}
                onClick={() => history.push(`${url}/newId`)}
              >
                Из CRM
              </button>
              <button
                className={cx(dropDownStyles.element, 'text_1')}
                onClick={copenPopupCreateFromExist}
              >
                Из готовой аудитории
              </button>
              <button
                className={cx(dropDownStyles.element, 'text_1')}
                onClick={() => history.push(`${url}/create_new`)}
              >
                Новая
              </button>
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
            {data.map((dataRow, index) => {
              const { id, name, contact_count, create_date, last_update_date } = dataRow
              const checked = isItChecked(index)
              return (
                <div className={tableStyles.row} key={index} onClick={openAudience} data-id={id}>
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
                  <div className={cx(tableStyles.cell, 'text_1')}>{index}</div>
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
        </div>
      </div>
      <PopupOfCreationFromExist
        close={closePopupCreateFromExist}
        isOpen={popupCreateFromExistIsOpen}
      />
    </>
  )
}

export default AllAudiences
