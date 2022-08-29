import { FC, useState, RefObject } from 'react'
import cx from 'classnames'

import styles from './Table.module.scss'
import stylesTable from './TableBase.module.scss'

import { IconArrow, IconCheck } from 'assets/icons'
import { ASCENDING, DESCENDING } from 'constants/dictionary'

interface ITable {
  headers: string[]
  innerRef?: RefObject<HTMLDivElement>
  checkBoxesEnabled?: boolean
  checkedAll?: boolean
  toggleAllChecks?: () => void
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
}) => {
  const [sorting, setSorting] = useState<ISorting>({
    columnNumber: 4,
    direction: DESCENDING,
  })

  const changeSorting = (index: number) => {
    if (index === 0) return

    const { columnNumber, direction } = sorting

    const itIsSecondClick = columnNumber === index && direction === ASCENDING
    const newDirection = itIsSecondClick ? DESCENDING : ASCENDING

    setSorting({
      columnNumber: index,
      direction: newDirection,
    })
  }

  return (
    <div className={styles.table}>
      <div className={styles.head}>
        <div className={styles.tableRow}>
          {headers.map((columnName, index) => {
            return columnName === '' ? (
              <HeaderCheckCell {...{ toggleAllChecks, checkedAll }} />
            ) : (
              <HeaderDefaultCell {...{ columnName, sorting, changeSorting, index }} />
            )
          })}
        </div>
      </div>
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
  changeSorting: (index: number) => void
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
    <div
      key={columnName}
      className={cx(styles.headCell, 'text_1_hl_1')}
      onClick={() => changeSorting(index)}
    >
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
      key={0}
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

export default Table
