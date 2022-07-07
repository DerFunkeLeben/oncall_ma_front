import { FC, useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

import styles from './DropDown.module.scss'

interface DropDown {
  triggerNode: React.ReactNode
}

const DropDown: FC<DropDown> = ({ children, triggerNode }) => {
  const [isMenuOpened, setMenuOpened] = useState(false)
  const [ddStyle, setDdStyle] = useState({})
  const triggerRef = useRef<HTMLElement>(null)
  const dropContainerRef = useRef<HTMLElement>(null)

  const togglePopup = () => setMenuOpened(!isMenuOpened)
  const closePopup = () => setMenuOpened(false)

  const triggerPosition = triggerRef.current?.getBoundingClientRect()
  const dropContainerPosition = dropContainerRef.current?.getBoundingClientRect()
  const gap = 10
  const paddingRight = 30

  console.log(dropContainerPosition, triggerPosition)

  // const ddStyle = triggerPosition &&
  //   dropContainerPosition && {
  //     top: triggerPosition.top,
  //     left: triggerPosition.left,
  //     paddingTop: triggerPosition.height + gap,
  //   }
  useEffect(() => {
    if (!(triggerPosition && dropContainerPosition)) return
    setDdStyle({
      top: triggerPosition.top,
      left: triggerPosition.left,
      paddingTop: triggerPosition.height + gap,
    })
  }, [triggerPosition, dropContainerPosition])

  return (
    <>
      <div onClick={togglePopup} ref={triggerRef as React.RefObject<HTMLDivElement>}>
        {triggerNode}
      </div>
      {isMenuOpened &&
        createPortal(
          <div
            onMouseLeave={closePopup}
            className={styles.taskHoverBlock}
            style={ddStyle}
            ref={dropContainerRef as React.RefObject<HTMLDivElement>}
          >
            {children}
          </div>,
          document.body
        )}
    </>
  )
}

export default DropDown
