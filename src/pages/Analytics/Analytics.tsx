import { FC } from 'react'

import styles from './Analytics.module.scss'
import Sidebar from 'components/parts/Sidebar/Sidebar'

const Analytics: FC = () => {
  return (
    <div className={styles.page}>
      <Sidebar />
      Analytics
    </div>
  )
}

export default Analytics
