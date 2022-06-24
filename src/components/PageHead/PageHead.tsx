import { FC } from 'react'
import cx from 'classnames'

import styles from './PageHead.module.scss'

interface IPageHead {
  title: string
}

const PageHead: FC<IPageHead> = ({ title, children }) => {
  return (
    <div className={styles.head}>
      <div className={styles.titleBlock}>
        <h1 className={cx(styles.title, 'header_1')}>{title}</h1>
      </div>
      <div className={styles.controlsBlock}>{children}</div>
    </div>
  )
}
export default PageHead
