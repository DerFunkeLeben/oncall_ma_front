import { FC } from 'react'
import cx from 'classnames'

import styles from './PageHead.module.scss'

interface IPageHead {
  title: string
  subtitle?: string
}

const PageHead: FC<IPageHead> = ({ title, subtitle, children }) => {
  return (
    <div className={styles.head}>
      <div className={styles.titleBlock}>
        <h1 className={cx(styles.title, 'h1')}>{title}</h1>
        {subtitle && <p className={styles.subTitle}>{subtitle}</p>}
      </div>
      <div className={styles.controlsBlock}>{children}</div>
    </div>
  )
}
export default PageHead
