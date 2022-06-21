import { FC } from 'react'
import cx from 'classnames'

import styles from './TableBase.module.scss'

interface IRow {
  id: number
  children: React.ReactNode
}

const RowWithCheckbox: FC<IRow> = ({ id, children }) => {
  return (
    <div className={styles.row} key={id}>
      <div className="check"></div>
      {children}
    </div>
  )
}
export default RowWithCheckbox
