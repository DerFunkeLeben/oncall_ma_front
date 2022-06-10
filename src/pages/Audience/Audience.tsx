import { FC } from 'react'
import cx from 'classnames'

import styles from './Audience.module.scss'
import Sidebar from 'components/parts/Sidebar/Sidebar'

const Audience: FC = () => {
  return (
    <div className={cx(styles.page)}>
      <Sidebar />
      <div className={styles.pageContent}>
        <div className={styles.head}>
          <h1 className={styles.title}>Аудитории</h1>
          <p className={styles.subTitle}>Вы можете создать или редактировать аудиторию</p>
        </div>
      </div>
    </div>
  )
}

export default Audience
