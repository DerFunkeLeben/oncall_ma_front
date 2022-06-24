import { FC } from 'react'
import cx from 'classnames'

import styles from './CheckMenu.module.scss'

interface ICheckMenu {
  checkedCount: number
  total: number
}

const CheckMenu: FC<ICheckMenu> = ({ children, checkedCount, total }) => {
  return (
    <div className={styles.checkMenu}>
      <div className={styles.buttonConianter}>{children}</div>
      <div className={cx(styles.amount, 'text_1')}>
        Отмечено
        <span className={cx(styles.amountNumber, 'text_1_hl_3')}>{`${checkedCount}/${total}`}</span>
      </div>
    </div>
  )
}
export default CheckMenu
