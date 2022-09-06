import { FC, memo, useEffect } from 'react'
import { createPortal } from 'react-dom'
import cx from 'classnames'

import useAlertContext from 'context/AlertContext'
import { AlertBoxIcons } from 'constants/dictionary'
import { IconSuccess, IconTrash, IconWarning } from 'assets/icons'
import styles from './AlertBox.module.scss'

const { WARNING, SUCCESS, DELETE } = AlertBoxIcons
const TIME = 3000

const iconVars = {
  [WARNING]: <IconWarning />,
  [SUCCESS]: <IconSuccess />,
  [DELETE]: <IconTrash className={styles.alert} />,
}

const AlertBox: FC = () => {
  const { alertBox, hideAlertBox } = useAlertContext()
  const { isOpen, message, icon } = alertBox

  useEffect(() => {
    if (!isOpen) return

    const timeId = setTimeout(hideAlertBox, TIME)
    return () => clearTimeout(timeId)
  }, [isOpen])

  if (!isOpen) return null
  return createPortal(
    <div className={styles.wrapper}>
      {iconVars[icon ?? WARNING]}
      <div
        className={cx(styles.message, 'text_05')}
        dangerouslySetInnerHTML={{ __html: message }}
      ></div>
    </div>,
    document.body
  )
}

export default memo(AlertBox)
