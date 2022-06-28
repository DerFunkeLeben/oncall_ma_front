import { FC, useState, RefObject } from 'react'
import cx from 'classnames'

import styles from './Table.module.scss'
import stylesTable from './TableBase.module.scss'

import { IconArrow } from 'assets/icons'
import { ASCENDING, DESCENDING } from 'constants/dictionary'

interface ITable {
  headers: string[]
  innerRef?: RefObject<HTMLDivElement>
  children: React.ReactNode[] | React.ReactNode
}

const Table: FC<ITable> = ({ children, innerRef, headers }) => {
  const [sorting, setSorting] = useState({
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
          {headers.map((column, index) => {
            const sortDirection = index === sorting.columnNumber ? sorting.direction : null
            return (
              <div
                key={column}
                className={cx(styles.headCell, 'text_1_hl_1', {
                  [stylesTable.cellCheck]: index === 0,
                })}
                onClick={() => changeSorting(index)}
              >
                <p>
                  {column}
                  {sortDirection && (
                    <IconArrow className={cx(styles.iconArrow, styles[sortDirection])} />
                  )}
                </p>
              </div>
            )
          })}
        </div>
      </div>
      <div className={styles.tbody} ref={innerRef}>
        {children}
        {true && <EmptyRow />}
      </div>
    </div>
  )
}

const EmptyRow = () => (
  <div className={stylesTable.row}>
    <div className={stylesTable.cell}></div>
  </div>
)

export default Table
