import { FC } from 'react'

import styles from './Content.module.scss'
import Sidebar from 'components/parts/Sidebar/Sidebar'

const Content: FC = () => {
  return (
    <div className={styles.page}>
      <Sidebar />
      Content
    </div>
  )
}

export default Content
