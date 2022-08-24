import { FC } from 'react'

import styles from './Content.module.scss'
import Sidebar from 'components/Sidebar/Sidebar'
import PageHead from 'components/PageHead/PageHead'
import FileDropZone from './FileDropZone/FileDropZone'

const Content: FC = () => {
  return (
    <div className={styles.page}>
      <Sidebar />
      <div className={styles.pageContent}>
        <PageHead title="Контент" />
        <FileDropZone />
      </div>
    </div>
  )
}

export default Content
