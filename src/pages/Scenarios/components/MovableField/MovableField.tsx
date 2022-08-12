import { FC, useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'

import styles from './MovableField.module.scss'

const MovableField: FC = ({ children }) => {
  const field = useRef<HTMLDivElement>(null)
  const container = useRef<HTMLDivElement>(null)
  const [mouseIsDown, setMouseIsDown] = useState(false)

  const getContainerRect = () => {
    const containerPosition = container?.current?.getBoundingClientRect()
    if (!containerPosition) return { x: 0, y: 0, width: 0, height: 0 }
    return containerPosition
  }
  const getFieldRect = () => {
    const containerPosition = field?.current?.getBoundingClientRect()
    if (!containerPosition) return { x: 0, y: 0, width: 0, height: 0 }
    return containerPosition
  }

  const calcBounds = () => {
    const containerRect = getContainerRect()
    const fieldRect = getFieldRect()
    return {
      right: 0,
      left: -(fieldRect.width - containerRect.width),
      top: -(fieldRect.height - containerRect.height),
      bottom: 0,
    }
  }

  const handleStart = (e: any) => {
    if (e.target.dataset.type === 'action') return
    return
    setMouseIsDown(true)
  }

  const handleStop = () => {
    setMouseIsDown(false)
  }

  return (
    <div className={styles.fieldConainter} ref={container as React.RefObject<HTMLDivElement>}>
      <Draggable
        bounds={calcBounds()}
        onStart={handleStart}
        onStop={handleStop}
        // onDrag={handleDrag}
      >
        <div
          className={styles.movableField}
          ref={field as React.RefObject<HTMLDivElement>}
          style={{ cursor: mouseIsDown ? 'grabbing' : 'grab' }}
        >
          {children}
        </div>
      </Draggable>
    </div>
  )
}

export default MovableField
