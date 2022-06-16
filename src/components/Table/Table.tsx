import { FC, useState } from 'react'
import cx from 'classnames'

import styles from './Table.module.scss'
import { ASCENDING, DESCENDING } from 'constants/dictionary'
import Loading from 'components/parts/Loading/Loading'

interface ITableColumnConfig {
  id: string
  name: string
  type: string
}

interface ITableDataRow {
  [key: string]: string
}

interface Table {
  config: ITableColumnConfig[]
  data?: ITableDataRow[]
  getData: (query: string) => void
}

const Table: FC<Table> = ({ config, data }) => {
  const [sorting, setSorting] = useState({
    columnNumber: 0,
    direction: ASCENDING,
  })

  const changeSorting = (index: number) => {
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
      <div className={cx(styles.head, styles.row)}>
        {config.map((element, index) => {
          const { id, name } = element
          const sortDirection = index === sorting.columnNumber ? sorting.direction : null
          return (
            <button
              key={id}
              className={cx(styles.cell, sortDirection)}
              onClick={() => changeSorting(index)}
            >
              {name}
            </button>
          )
        })}
      </div>
      <div className={styles.body}>{data ? <div></div> : <Loading />}</div>
    </div>
  )
}
export default Table
