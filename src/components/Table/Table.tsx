import { FC, useState, RefObject, ChangeEvent, MouseEventHandler } from 'react'
import cx from 'classnames'

import styles from './Table.module.scss'
import stylesTable from './TableBase.module.scss'
import buttonStyles from 'components/parts/Button/ButtonThemes.module.scss'

import { IconArrow, IconCheck, IconPlus, IconSettings } from 'assets/icons'
import { ASCENDING, DESCENDING } from 'constants/dictionary'
import Button from 'components/parts/Button/Button'

interface ITable {
  headers: string[]
  innerRef?: RefObject<HTMLDivElement>
  checkBoxesEnabled?: boolean
  checkedAll?: boolean
  toggleAllChecks?: () => void
  addBtnEnabled?: boolean
  handleAddBtn?: () => void
}

interface ISorting {
  columnNumber: number
  direction: string
}

const Table: FC<ITable> = ({
  children,
  innerRef,
  headers,
  checkBoxesEnabled,
  toggleAllChecks,
  checkedAll,
  addBtnEnabled,
  handleAddBtn,
}) => {
  const [sorting, setSorting] = useState<ISorting>({
    columnNumber: 4,
    direction: DESCENDING,
  })

  const changeSorting = (event: any) => {
    const { index } = event.target.dataset
    if (!index) return

    const { columnNumber, direction } = sorting

    const itIsSecondClick = columnNumber === +index && direction === ASCENDING
    const newDirection = itIsSecondClick ? DESCENDING : ASCENDING

    setSorting({
      columnNumber: +index,
      direction: newDirection,
    })
  }

  return (
    <div className={styles.table}>
      <div className={styles.head}>
        <div className={styles.tableRow}>
          {headers.map((columnName, index) => {
            if (columnName === '')
              return <HeaderCheckCell {...{ toggleAllChecks, checkedAll }} key={index} />
            if (columnName === '%%settings%%') return <HeaderSettingsCell key={index} />

            return (
              <HeaderDefaultCell {...{ columnName, sorting, changeSorting, index }} key={index} />
            )
          })}
        </div>
      </div>
      {addBtnEnabled && (
        <div className={styles.underHeader}>
          <Button modificator={buttonStyles.theme_additional} onClick={handleAddBtn}>
            <IconPlus />
            <span>Добавить строку</span>
          </Button>
        </div>
      )}
      <div className={styles.tbody} ref={innerRef}>
        {children}
        {checkBoxesEnabled && <EmptyRow />}
      </div>
    </div>
  )
}

const EmptyRow = () => (
  <div className={stylesTable.row}>
    <div className={stylesTable.cell}></div>
  </div>
)

interface IHeaderDefaultCell {
  changeSorting: MouseEventHandler<HTMLDivElement>
  columnName: string
  sorting: ISorting
  index: number
}

const HeaderDefaultCell: FC<IHeaderDefaultCell> = ({
  columnName,
  sorting,
  changeSorting,
  index,
}) => {
  const sortDirection = index === sorting.columnNumber ? sorting.direction : null

  return (
    <div className={cx(styles.headCell, 'text_1_hl_1')} data-index={index} onClick={changeSorting}>
      <p>
        {columnName}
        {sortDirection && <IconArrow className={cx(styles.iconArrow, styles[sortDirection])} />}
      </p>
    </div>
  )
}

interface IHeaderCellCheck {
  toggleAllChecks?: () => void
  checkedAll?: boolean
}

const HeaderCheckCell: FC<IHeaderCellCheck> = ({ toggleAllChecks, checkedAll }) => {
  return (
    <div
      className={cx(styles.headCell, 'text_1_hl_1', stylesTable.cellCheck)}
      onClick={toggleAllChecks}
    >
      <div
        className={cx(stylesTable.check, {
          [stylesTable.checked]: checkedAll,
        })}
      >
        {checkedAll && <IconCheck />}
      </div>
    </div>
  )
}

interface IHeaderSettingsCell {
  openSettingsPopup?: () => void
}
const HeaderSettingsCell: FC<IHeaderSettingsCell> = ({ openSettingsPopup }) => {
  return (
    <div
      className={cx(styles.headCell, 'text_1_hl_1', stylesTable.cellCheck)}
      onClick={openSettingsPopup}
    >
      <IconSettings />
    </div>
  )
}

export default Table
