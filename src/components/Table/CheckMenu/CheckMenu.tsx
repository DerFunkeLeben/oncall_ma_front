import { FC } from 'react'
import cx from 'classnames'

import CheckMenuOption from './CheckMenuOption'

import { ICheckMenuConfig } from 'types'

import styles from './CheckMenu.module.scss'

interface ICheckMenu {
  checkedCount: number
  totalCountOfData: number
  checkMenuConfig?: ICheckMenuConfig[]
}

const CheckMenu: FC<ICheckMenu> = ({ checkedCount, totalCountOfData, checkMenuConfig }) => {
  return (
    <div className={styles.checkMenu}>
      <div className={styles.buttonConianter}>
        {checkMenuConfig?.map((btn, index) => (
          <CheckMenuOption {...btn} key={index} />
        ))}
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
