import { FC } from 'react'
import cx from 'classnames'

import styles from './ButtonBase.module.scss'

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  modificator?: string | string[]
}

const Button: FC<IButton> = ({ onClick, modificator, children, type, ...props }) => {
  return (
    <button
      className={cx(styles.button, styles.border, modificator)}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
