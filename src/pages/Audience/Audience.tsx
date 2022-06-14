import { FC } from 'react'
import cx from 'classnames'

import styles from './Audience.module.scss'
import Sidebar from 'components/parts/Sidebar/Sidebar'
import Button from 'components/parts/Button/Button'

const Audience: FC = () => {
  return (
    <div className={cx(styles.page)}>
      <Sidebar />
      <div className={styles.pageContent}>
        <div className={styles.head}>
          <div className={styles.titleBlock}>
            <h1 className={cx(styles.title, 'h1')}>Аудитории</h1>
            <p className={styles.subTitle}>Вы можете создать или редактировать аудиторию</p>
          </div>
          <div className={styles.controlsBlock}>
            <Button>
              <p>Загрузить аудиторию</p>
            </Button>
            <Button>
              <p>Создать аудиторию</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Audience
