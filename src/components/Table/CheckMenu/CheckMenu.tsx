import { FC } from 'react'
import cx from 'classnames'

import styles from './CheckMenu.module.scss'
import { IconCopy, IconTrash } from 'assets/icons'

interface ICheckMenu {
  checkedCount: number
  totalCountOfData: number
}

const CheckMenu: FC<ICheckMenu> = ({ checkedCount, totalCountOfData }) => {
  return (
    <div className={styles.checkMenu}>
      <div className={styles.buttonConianter}>
        <button className={cx(styles.button, 'text_1')}>
          <IconCopy className={styles.buttonIcon} />
          Копировать
        </button>
        <button className={cx(styles.button, styles.alarm, 'text_1')}>
          <IconTrash className={styles.buttonIcon} />
          Удалить
        </button>
      </div>
      <div className={cx(styles.amount, 'text_1')}>
        Отмечено
        <span
          className={cx(styles.amountNumber, 'text_1_hl_2')}
        >{`${checkedCount}/${totalCountOfData}`}</span>
      </div>
    </div>
  )
}
export default CheckMenu
