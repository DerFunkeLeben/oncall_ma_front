import { FC, useEffect } from 'react'
import { createPortal } from 'react-dom'
import cx from 'classnames'

import { AlertBoxIcons } from 'constants/dictionary'
import { IconSuccess, IconTrash, IconWarning } from 'assets/icons'
import styles from './AlertBox.module.scss'

interface IAlertBox {
  message: string
  isOpen: boolean
  close: () => void
  icon: AlertBoxIcons | undefined
}

const { WARNING, SUCCESS, DELETE } = AlertBoxIcons
const TIME = 3000

const iconVars = {
  [WARNING]: <IconWarning />,
  [SUCCESS]: <IconSuccess />,
  [DELETE]: <IconTrash className={styles.alert} />,
}

const AlertBox: FC<IAlertBox> = ({ isOpen, close, message, icon }) => {
  useEffect(() => {
    if (!isOpen) return

    const timeId = setTimeout(close, TIME)
    return () => clearTimeout(timeId)
  }, [isOpen])

  if (!isOpen) return null
  return createPortal(
    <div className={styles.wrapper}>
      {iconVars[icon || WARNING]}
      <div
        className={cx(styles.message, 'text_05')}
        dangerouslySetInnerHTML={{ __html: message }}
      ></div>
    </div>,
    document.body
  )
}

export default AlertBox
