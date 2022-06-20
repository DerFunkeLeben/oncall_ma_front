import { FC } from 'react'

import styles from './Analytics.module.scss'
import Sidebar from 'components/Sidebar/Sidebar'
import PageHead from 'components/PageHead/PageHead'

const Analytics: FC = () => {
  return (
    <div className={styles.page}>
      <Sidebar />
      <div className={styles.pageContent}>
        <PageHead title="Аналитика" />
      </div>
    </div>
  )
}

export default Analytics
