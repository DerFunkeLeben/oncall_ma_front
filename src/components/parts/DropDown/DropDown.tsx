import { FC, useState, useRef } from 'react'
import cx from 'classnames'
import { createPortal } from 'react-dom'

import tableStyles from 'components/Table/TableBase.module.scss'
import styles from './DropDown.module.scss'

interface DropDown {
  id: string
  children: React.ReactNode
}

const DropDown: FC<DropDown> = ({ id, children }) => {
  const [isMenuOpened, setMenuOpened] = useState(false)
  const dotsRef = useRef(null)

  const togglePopup = () => setMenuOpened(!isMenuOpened)
  const closePopup = () => setMenuOpened(false)

  const rect = (dotsRef.current as any)?.getBoundingClientRect()

  const handleClick = async (e: any) => {
    const actionLabel = e.target?.closest('[data-label]')?.dataset?.label

    if (!actionLabel) return
    setMenuOpened(false)
  }

  return (
    <div
      className={cx(tableStyles.cell, styles.dotsCell)}
      onMouseLeave={closePopup}
      onClick={handleClick}
    >
      <div onClick={togglePopup}>{/* <DotsIcon ref={dotsRef} /> */}</div>
      {isMenuOpened &&
        createPortal(
          <div
            className={styles.taskHoverBlock}
            style={{
              top: rect?.top,
              left: rect?.left,
            }}
            data-id={id}
          >
            {children}
          </div>,
          document.body
        )}
    </div>
  )
}

export default DropDown
