import { FC, useState, useRef, useContext } from 'react'
import { createPortal } from 'react-dom'
import cx from 'classnames'

import screenSizeContext from 'context/screenSizeContext'
import { Align } from 'constants/dictionary'

import styles from './DropDown.module.scss'

interface DropDown {
  triggerNode: React.ReactNode
  align?: Align
  customStyles?: { [key: string]: string }
}

const DropDown: FC<DropDown> = ({
  children,
  triggerNode,
  customStyles = {},
  align = Align.LEFT,
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

  const calcDDPosition = () => {
    if (!triggerPosition) return
    const position = {
      top: triggerPosition.top,
      paddingTop: triggerPosition.height + gap,
    }
    if (align === Align.RIGHT) {
      return { ...position, right: Number(windowSize) - triggerPosition.right }
    } else if (align === Align.TOP_CENTER) {
      return {
        ...position,
        left: triggerPosition.left + triggerPosition.width / 2,
        transform: 'translateX(-50%)',
      }
    } else if (align === Align.BOTTOM_CENTER) {
      return {
        top: triggerPosition.bottom,
        paddingBottom: triggerPosition.height + gap,
        left: triggerPosition.left + triggerPosition.width / 2,
        transform: 'translate(-50%, -100%)',
      }
    } else {
      return { ...position, left: triggerPosition.left }
    }
  }

  const ddStyle = calcDDPosition()
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
