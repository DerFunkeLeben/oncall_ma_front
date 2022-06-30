import { FC } from 'react'
import { createPortal } from 'react-dom'

import styles from './Popup.module.scss'

interface IPopup {
  isOpen: boolean
  close: () => void
}

const Popup: FC<IPopup> = ({ isOpen, close, children }) => {
  if (!isOpen) return null
  return createPortal(
    <div className={styles.popupWrapper}>
      <div className={styles.popupBackground} onClick={close} />
      <div className={styles.popupContent}>{children}</div>
    </div>,
    document.body
  )
}

export default Popup
