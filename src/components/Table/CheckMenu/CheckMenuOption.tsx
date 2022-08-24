import { FC } from 'react'
import cx from 'classnames'

import { ICheckMenuConfig } from 'types'

import styles from './CheckMenu.module.scss'

const CheckMenuOption: FC<ICheckMenuConfig> = ({ handleClick, modificators, Icon, caption }) => {
  return (
    <button
      className={cx(styles.button, 'text_1', {
        [styles.alarm]: modificators?.includes('alarm'),
      })}
      onClick={handleClick}
    >
      <Icon className={styles.buttonIcon} />
      {caption}
    </button>
  )
}
export default CheckMenuOption
