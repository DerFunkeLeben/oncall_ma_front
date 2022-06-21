import { FC, useState, useRef } from 'react'
import { createPortal } from 'react-dom'

import styles from './DropDown.module.scss'

interface DropDown {
  children: React.ReactNode
  triggerNode: React.ReactNode
}

const DropDown: FC<DropDown> = ({ children, triggerNode }) => {
  const [isMenuOpened, setMenuOpened] = useState(false)
  const dotsRef = useRef<HTMLElement>(null)

  const togglePopup = () => setMenuOpened(!isMenuOpened)
  const closePopup = () => setMenuOpened(false)

  const rect = dotsRef.current?.getBoundingClientRect()
  const gap = 10
  const ddStyle = rect && {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    paddingTop: rect.height + gap,
  }

  return (
    <>
      <div onClick={togglePopup} ref={dotsRef as React.RefObject<HTMLDivElement>}>
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
