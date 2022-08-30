import { FC, useState, useRef, useContext } from 'react'
import { createPortal } from 'react-dom'
import cx from 'classnames'

import screenSizeContext from 'context/screenSizeContext'

import styles from './DropDown.module.scss'

interface DropDown {
  triggerNode: React.ReactNode
  alignRight?: boolean
  customStyles?: { [key: string]: string }
}

const DropDown: FC<DropDown> = ({
  children,
  triggerNode,
  customStyles = {},
  alignRight = false,
}) => {
  const [isMenuOpened, setMenuOpened] = useState(false)
  const triggerRef = useRef<HTMLElement>(null)
  const windowSize: string = useContext(screenSizeContext)

  const togglePopup = (event: any) => {
    event.stopPropagation()
    setMenuOpened(!isMenuOpened)
  }
  const closePopup = (event: any) => {
    event.stopPropagation()
    setMenuOpened(false)
  }

  const triggerPosition = triggerRef.current?.getBoundingClientRect()
  const gap = 10
  const paddingRight = 30

  const calcDDPosition = (isRight: boolean) => {
    if (!triggerPosition) return
    const position = {
      top: triggerPosition.top,
      paddingTop: triggerPosition.height + gap,
    }
    if (isRight) {
      return { ...position, right: Number(windowSize) - triggerPosition.right }
    } else {
      return { ...position, left: triggerPosition.left }
    }
  }

  const ddStyle = calcDDPosition(alignRight)
  return (
    <>
      <div
        className={cx(styles.triggerContainer, {
          [customStyles.triggerContainerActive]: isMenuOpened,
        })}
        onClick={togglePopup}
        ref={triggerRef as React.RefObject<HTMLDivElement>}
      >
        {triggerNode}
      </div>
      {isMenuOpened &&
        createPortal(
          <div
            onMouseLeave={closePopup}
            onClick={closePopup}
            className={styles.taskHoverBlock}
            style={ddStyle}
          >
            {children}
          </div>,
          document.body
        )}
    </>
  )
}

export default DropDown
