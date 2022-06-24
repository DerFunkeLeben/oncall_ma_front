import { FC, useState, useRef } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import cx from 'classnames'

import PageHead from 'components/PageHead/PageHead'
import Button from 'components/parts/Button/Button'
import DropDown from 'components/parts/DropDown/DropDown'
import ScrollTable from 'components/Table/ScrollTable'

import styles from './AllAudiences.module.scss'
import buttonStyles from 'components/parts/Button/ButtonThemes.module.scss'
import tableStyles from 'components/Table/TableBase.module.scss'
import checkMenuStyles from 'components/Table/CheckMenu/CheckMenu.module.scss'
import ddStyles from 'components/parts/DropDown/DropDown.module.scss'

import { IPageData } from 'types'

import { IconCheck, IconCopy, IconTrash } from 'assets/icons'
import { data } from './data'
import CheckMenu from 'components/Table/CheckMenu/CheckMenu'

const header = ['', 'ID', 'Название', 'Количество контактов', 'Дата создания', 'Дата изменения']

const AllAudiences: FC<IPageData> = () => {
  const history = useHistory()
  const { url } = useRouteMatch()

  const openAudience = () => {
    console.log('asd')
  }

  const [checkedList, setCheckedList] = useState<number[]>([])
  const simplebarRef = useRef<SimpleBar>(null)

  const totalCountOFData = data.length ///TODO когда будет бк нужно будет переделать
  const checkedCount = checkedList.length

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
    <div className={styles.pageContent}>
      <PageHead title="Аудитории" subtitle="Вы можете создать или редактировать аудиторию">
        <Button modificator={buttonStyles.theme_secondary}>
          <p>Загрузить аудиторию</p>
        </Button>
        <DropDown
          triggerNode={
            <Button>
              <p>Создать аудиторию</p>
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
      <ScrollTable
        headers={header}
        handleScrollLimit={() => console.log('handleScrollLimit')}
        simplebarRef={simplebarRef}
        checkMenu={
          checkMenuIsOpen() && (
            <CheckMenu checkedCount={checkedCount} total={totalCountOFData}>
              <button className={cx(checkMenuStyles.button, 'text_1')}>
                <IconCopy className={checkMenuStyles.buttonIcon} />
                Копировать
              </button>
              <button className={cx(checkMenuStyles.button, 'text_1')}>
                <IconTrash className={checkMenuStyles.buttonIcon} />
                Удалить
              </button>
            </CheckMenu>
          )
        }
      >
        {data.map((dataRow, index) => {
          const { name, contact_count, create_date, last_update_date } = dataRow
          const checked = isItChecked(index)
          return (
            <div className={tableStyles.row} key={index} onClick={toggleCheck} data-id={index}>
              <div className={cx(tableStyles.cell, 'checkContainer')}>
                <div
                  className={cx(tableStyles.check, {
                    [tableStyles.checked]: checked,
                  })}
                >
                  {checked && <IconCheck />}
                </div>
              </div>
              <p className={cx(tableStyles.cell, 'text_1')}>{index}</p>
              <p className={cx(tableStyles.cell)}>
                <button className={'text_1_hl_2'} onClick={openAudience}>
                  {name}
                </button>
              </p>
              <p className={cx(tableStyles.cell, 'text_1')}>{contact_count}</p>
              <p className={cx(tableStyles.cell, 'text_1')}>{create_date}</p>
              <p className={cx(tableStyles.cell, 'text_1')}>{last_update_date}</p>
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
