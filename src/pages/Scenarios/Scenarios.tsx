import { FC } from 'react'
import cx from 'classnames'

import styles from './Scenarios.module.scss'
import Sidebar from 'components/Sidebar/Sidebar'
import PageHead from 'components/PageHead/PageHead'

const Scenarios: FC = () => {
  return (
    <div className={styles.page}>
      <Sidebar />
      <div className={styles.pageContent}>
        <PageHead title="Сценарии" />
      </div>
    </div>
  )
}

export default Scenarios
