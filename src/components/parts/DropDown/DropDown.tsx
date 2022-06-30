import { FC, useState, useRef } from 'react'
import { createPortal } from 'react-dom'

import styles from './DropDown.module.scss'

interface DropDown {
  triggerNode: React.ReactNode
}

const DropDown: FC<DropDown> = ({ children, triggerNode }) => {
  const [isMenuOpened, setMenuOpened] = useState(false)
  const triggerRef = useRef<HTMLElement>(null)

  const togglePopup = () => setMenuOpened(!isMenuOpened)
  const closePopup = () => setMenuOpened(false)

  const rect = triggerRef.current?.getBoundingClientRect()
  const gap = 10
  const paddingRight = 30

  const ddStyle = rect && {
    top: rect.top,
    right: paddingRight,
    paddingTop: rect.height + gap,
  }

  return (
    <>
      <div onClick={togglePopup} ref={triggerRef as React.RefObject<HTMLDivElement>}>
        {triggerNode}
      </div>
      {isMenuOpened &&
        createPortal(
          <div onMouseLeave={closePopup} className={styles.taskHoverBlock} style={ddStyle}>
            {children}
          </div>,
          document.body
        )}
    </>
  )
}

export default DropDown
