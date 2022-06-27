import { FC, useState, useRef, useEffect, useContext } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import cx from 'classnames'

import PageHead from 'components/PageHead/PageHead'
import Button from 'components/parts/Button/Button'
import DropDown from 'components/parts/DropDown/DropDown'
import ScrollTable from 'components/Table/ScrollTable'
import CheckMenu from 'components/Table/CheckMenu/CheckMenu'
import Folders from 'components/Folders/Folders'
import InputBase from 'components/parts/InputBase/InputBase'

import styles from './AllAudiences.module.scss'
import buttonStyles from 'components/parts/Button/ButtonThemes.module.scss'
import tableStyles from 'components/Table/TableBase.module.scss'
import checkMenuStyles from 'components/Table/CheckMenu/CheckMenu.module.scss'
import ddStyles from 'components/parts/DropDown/DropDown.module.scss'

import { IPageData } from 'types'
import { IconCheck, IconCopy, IconTrash, IconUpload, IconLoupe } from 'assets/icons'
import { data } from './audiencesData'

const header = ['', 'ID', 'Название', 'Количество контактов', 'Дата создания', 'Дата изменения']
const menuIsOpen = true

const AllAudiences: FC<IPageData> = () => {
  const history = useHistory()
  const { url } = useRouteMatch()
  const [checkedList, setCheckedList] = useState<number[]>([])

  const totalCountOFData = data.length
  const checkedCount = checkedList.length

  const openAudience = (e: React.MouseEvent<HTMLElement>) => {
    const { id } = e.currentTarget.dataset
    history.push(`${url}/${id}`)
  }

  const isItChecked = (id: number) => {
    return checkedList.includes(id)
  }

  const checkMenuIsOpen = () => checkedList.length > 0

  const toggleCheck = (e: React.MouseEvent<HTMLElement>) => {
    const { id } = e.currentTarget.dataset
    const idNum = Number(id)
    if (isItChecked(idNum)) {
      const newChecked = checkedList.filter((el) => el !== idNum)
      setCheckedList(newChecked)
    } else setCheckedList([...checkedList, idNum])
  }

  return (
    <div className={cx(styles.pageContent, { [styles.menuIsOpen]: menuIsOpen })}>
      <PageHead
        title="Аудитории"
        leftSide={
          <InputBase
            placeholder="Поиск по названию"
            icon={true}
            handleInputChange={() => console.log('asd')}
          ></InputBase>
        }
      >
        <Button modificator={buttonStyles.theme_secondary}>
          <IconUpload />
          <span>Загрузить аудиторию</span>
        </Button>
        <DropDown
          triggerNode={
            <Button>
              <span>Создать аудиторию</span>
            </Button>
          }
        >
          <div className={ddStyles.container}>
            <button className={ddStyles.element} onClick={() => history.push(`${url}/fakeID`)}>
              Из CRM
            </button>
            <button className={ddStyles.element} onClick={() => console.log('Попап из готовой')}>
              Из готовой аудитории
            </button>
            <button className={ddStyles.element} onClick={() => history.push(`${url}/create_new`)}>
              Новая
            </button>
          </div>
        </DropDown>
      </PageHead>
      <Folders />
      <ScrollTable
        headers={header}
        handleScrollLimit={() => console.log('handleScrollLimit')}
        checkMenu={
          checkMenuIsOpen() && (
            <CheckMenu checkedCount={checkedCount} total={totalCountOFData}>
              <button className={cx(checkMenuStyles.button, 'text_1')}>
                <IconCopy className={checkMenuStyles.buttonIcon} />
                Копировать
              </button>
              <button className={cx(checkMenuStyles.button, checkMenuStyles.alarm, 'text_1')}>
                <IconTrash className={checkMenuStyles.buttonIcon} />
                Удалить
              </button>
            </CheckMenu>
          )
        }
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
        {true && <EmptyRow />}
      </ScrollTable>
    </div>
  )
}

const EmptyRow = () => (
  <div className={tableStyles.row}>
    <div className={tableStyles.cell}></div>
  </div>
)

export default AllAudiences
