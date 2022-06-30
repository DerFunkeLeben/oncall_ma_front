import { FC } from 'react'
import { createPortal } from 'react-dom'

import styles from './SidePopup.module.scss'

interface SidePopup {
  isOpen: boolean
  close: () => void
}

const SidePopup: FC<SidePopup> = ({ isOpen, close, children }) => {
  if (!isOpen) return null
  return createPortal(
    <div className={styles.popupWrapper}>
      <div className={styles.popupBackground} onClick={close} />
      <div className={styles.popupContent}>{children}</div>
    </div>,
    document.body
  )
}

export default SidePopup
