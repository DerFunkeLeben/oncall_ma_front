import { FC, useState, RefObject } from 'react'
import cx from 'classnames'

import styles from './Table.module.scss'

import { IconArrowDown } from 'assets/icons'

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
                className={cx(styles.headCell, 'text_1_hl_1')}
                onClick={() => changeSorting(index)}
              >
                {column}
                {sortDirection && (
                  <IconArrowDown className={cx(styles.iconArrow, styles[sortDirection])} />
                )}
              </div>
            )
          })}
        </div>
      </div>
      <div className={styles.tbody} ref={innerRef}>
        {children}
      </div>
    </div>
  )
}

export default Table
