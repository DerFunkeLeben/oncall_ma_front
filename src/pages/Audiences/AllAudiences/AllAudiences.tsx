import { FC, useEffect, useState, useRef } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import cx from 'classnames'

import PageHead from 'components/PageHead/PageHead'
import Button from 'components/parts/Button/Button'
import DropDown from 'components/parts/DropDown/DropDown'
import ScrollTable from 'components/Table/ScrollTable'

import styles from './AllAudiences.module.scss'
import buttonStyles from 'components/parts/Button/ButtonThemes.module.scss'
import tableStyles from 'components/Table/TableBase.module.scss'
import ddStyles from 'components/parts/DropDown/DropDown.module.scss'

import { IPageData } from 'types'

import { IconCheck } from 'assets/icons'
import { data } from './data'

const header = ['', 'ID', 'Название', 'Количество контактов', 'Дата создания', 'Дата изменения']

const AllAudiences: FC<IPageData> = () => {
  const history = useHistory()
  const { url } = useRouteMatch()

  const openAudience = () => {
    console.log('asd')
  }

  const [checkedList, setCheckedList] = useState<number[]>([])
  const [lastTriggeredCheck, setLastTriggeredCheck] = useState<number>(0)
  const simplebarRef = useRef<SimpleBar>(null)

  const isItChecked = (id: number) => {
    return checkedList.includes(id)
  }

  const checkMenuIsOpen = () => checkedList.length > 0

  const toggleCheck = (e: any) => {
    const { id } = e.currentTarget.dataset
    const idNum = Number(id)
    if (isItChecked(idNum)) {
      const newChecked = checkedList.filter((el) => el !== idNum)
      setCheckedList(newChecked)
    } else setCheckedList([...checkedList, idNum])
    setLastTriggeredCheck(idNum)
    const idOfLastElement = data[data.length - 1].id
    if (idNum === idOfLastElement) e.currentTarget.scrollIntoView()
  }

  useEffect(() => {
    const idOfLastElement = data[data.length - 1].id
    console.log(lastTriggeredCheck, idOfLastElement)
    if (lastTriggeredCheck === idOfLastElement) scrollToBottom()
    // if (!checkMenuIsOpen()) scrollToBottom()
  }, [lastTriggeredCheck, checkMenuIsOpen])

  const recalculate = () => {
    const scrollNode = simplebarRef.current
    console.log('recalculate!')
    if (scrollNode) scrollNode.recalculate()
  }

  const scrollToBottom = () => {
    console.log('scrollToBottom!')
    const scrollNode = simplebarRef.current
    if (!scrollNode) return
    const scrollElement = scrollNode.getScrollElement()
    const scrollHight = scrollElement.scrollHeight
    // scrollElement.scrollTo({ top: scrollHight, behavior: 'smooth' })
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
      {/* <button onClick={recalculate}>recalc</button> */}
      <ScrollTable
        headers={header}
        handleScrollLimit={() => console.log('handleScrollLimit')}
        simplebarRef={simplebarRef}
        checkMenu={
          checkMenuIsOpen() && (
            <div className={cx(tableStyles.checkMenu)}>
              {/* <button onClick={recalculate}>recalc</button> */}
            </div>
          )
        }
      >
        {data.map((dataRow, index) => {
          const { id, name, contact_count, create_date, last_update_date } = dataRow
          const checked = isItChecked(index)
          return (
            <div className={tableStyles.row} key={index} onClick={toggleCheck} data-id={index}>
              <div className="checkContainer">
                <div className={cx(tableStyles.check, { [tableStyles.checked]: checked })}>
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
        {checkMenuIsOpen() && (
          <div className={tableStyles.row}>
            <div className={tableStyles.cell}></div>
          </div>
        )}
      </ScrollTable>
    </div>
  )
}

export default AllAudiences
