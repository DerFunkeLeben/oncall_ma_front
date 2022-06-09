import { FC } from 'react'
import cx from 'classnames'

import styles from './Sidebar.module.scss'
import {
  IconLogo,
  IconProfile,
  IconAnalytics,
  IconAudit,
  IconFiles,
  IconJourney,
  IconBell,
} from 'assets/icons'

const Sidebar: FC = () => {
  return (
    <div className={cx(styles.Sidebar)}>
      <div className={cx(styles.logContainer)}>
        <IconLogo className={styles.icon} />
      </div>
      <div className={cx(styles.flexContainer)}>
        <button className={styles.button}>
          <IconAudit className={styles.icon} />
        </button>
        <button className={styles.button}>
          <IconFiles className={styles.icon} />
        </button>
        <button className={styles.button}>
          <IconJourney className={styles.icon} />
        </button>
        <button className={styles.button}>
          <IconAnalytics className={styles.icon} />
        </button>
      </div>
      <div className={cx(styles.flexContainer)}>
        <button className={styles.button}>
          <IconBell className={styles.icon} />
        </button>
        <button className={styles.button}>
          <IconProfile className={styles.icon} />
        </button>
      </div>
    </div>
  )
}

export default Sidebar
