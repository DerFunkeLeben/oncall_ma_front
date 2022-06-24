import { FC, useState, useRef, useEffect, useContext } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import cx from 'classnames'

import PageHead from 'components/PageHead/PageHead'
import Button from 'components/parts/Button/Button'
import DropDown from 'components/parts/DropDown/DropDown'
import ScrollTable from 'components/Table/ScrollTable'
import CheckMenu from 'components/Table/CheckMenu/CheckMenu'

import styles from './AllAudiences.module.scss'
import buttonStyles from 'components/parts/Button/ButtonThemes.module.scss'
import tableStyles from 'components/Table/TableBase.module.scss'
import checkMenuStyles from 'components/Table/CheckMenu/CheckMenu.module.scss'
import ddStyles from 'components/parts/DropDown/DropDown.module.scss'

import { IPageData } from 'types'
import { IconCheck, IconCopy, IconTrash } from 'assets/icons'
import { data } from './data'

import screenSizeContext from 'context/screenSizeContext'

const header = ['', 'ID', 'Название', 'Количество контактов', 'Дата создания', 'Дата изменения']

const AllAudiences: FC<IPageData> = () => {
  const history = useHistory()
  const { url } = useRouteMatch()
  const [checkedList, setCheckedList] = useState<number[]>([])
  const [tableIsFit, setTableIsFit] = useState(true)
  const simplebarRef = useRef<SimpleBar>(null)
  const windowSize: string = useContext(screenSizeContext)

  const scrollNode = simplebarRef.current
  const scrollElement = scrollNode?.getScrollElement()
  const totalCountOFData = data.length
  const checkedCount = checkedList.length
  let intervalName: NodeJS.Timeout
  const stepWidth = 2

  const openAudience = () => {
    console.log('asd')
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

  const oneStep = (step: number) => {
    if (!scrollElement) return
    const { scrollLeft } = scrollElement
    scrollElement.scrollTo({ left: scrollLeft + step })
  }

  const scrollTo = (step: number) => {
    stopMove()
    intervalName = setInterval(() => oneStep(step), 1)
  }

  const scrollToRight = () => {
    scrollTo(stepWidth)
  }

  const scrollToLeft = () => {
    scrollTo(-stepWidth)
  }

  //TODO обьеденить scrollToRight scrollToLeft

  const stopMove = () => {
    clearInterval(intervalName)
  }

  useEffect(() => {
    if (!scrollElement) return
    const { scrollWidth, clientWidth } = scrollElement
    const isTableFit = scrollWidth === clientWidth
    console.log(scrollWidth, clientWidth)
    setTableIsFit(isTableFit)
  }, [windowSize, scrollElement])

  return (
    <div className={styles.pageContent}>
      <PageHead title="Аудитории" subtitle="Вы можете создать или редактировать аудиторию">
        <Button modificator={buttonStyles.theme_secondary}>
          <p>Загрузить аудиторию</p>
        </Button>
        {!tableIsFit && (
          <>
            <button onMouseEnter={scrollToLeft} onMouseLeave={stopMove}>
              left
            </button>
            <button onMouseEnter={scrollToRight} onMouseLeave={stopMove}>
              right
            </button>
          </>
        )}
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
              <button className={cx(checkMenuStyles.button, checkMenuStyles.alarm, 'text_1')}>
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
                <button
                  className={cx(tableStyles.accentCell, 'text_1_hl_1')}
                  onClick={openAudience}
                >
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
