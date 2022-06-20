import { FC } from 'react'

import styles from './Content.module.scss'
import Sidebar from 'components/Sidebar/Sidebar'
import PageHead from 'components/PageHead/PageHead'

const Content: FC = () => {
  return (
    <div className={styles.page}>
      <Sidebar />
      <div className={styles.pageContent}>
        <PageHead title="Контент" />
      </div>
    </div>
  )
}

export default Content
