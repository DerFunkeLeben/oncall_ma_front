import { FC, useEffect, useRef, useState } from 'react'
import Draggable, { DraggableEventHandler } from 'react-draggable'

import { useScenario } from '../../../../store/scenario/useScenario'

import styles from './Field.module.scss'

const Field: FC = ({ children }) => {
  const field = useRef<HTMLDivElement>(null)
  const container = useRef<HTMLDivElement>(null)
  const [mouseIsDown, setMouseIsDown] = useState(false)
  const { taskIsMoving } = useScenario()

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

  const handleStart: DraggableEventHandler = () => {
    setMouseIsDown(true)
  }

  const handleDrag: DraggableEventHandler = () => {
    if (taskIsMoving) return false
  }

  const handleStop: DraggableEventHandler = () => {
    setMouseIsDown(false)
  }

  return (
    <div className={styles.fieldConainter} ref={container as React.RefObject<HTMLDivElement>}>
      <Draggable
        bounds={calcBounds()}
        onStart={handleStart}
        onStop={handleStop}
        onDrag={handleDrag}
      >
        <div
          className={styles.field}
          ref={field as React.RefObject<HTMLDivElement>}
          style={{ cursor: mouseIsDown ? 'grabbing' : 'grab' }}
        >
          <svg width="100%" height="100%">
            {/**надо вынести */}
            <defs>
              <pattern
                id="dots"
                x="0"
                y="0"
                width="11.7"
                height="11.7"
                patternUnits="userSpaceOnUse"
              >
                <circle fill="var(--blue_3)" cx="11.7" cy="11.7" r="2.57"></circle>
              </pattern>
            </defs>

            <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)"></rect>
          </svg>
          {children}
        </div>
      </Draggable>
    </div>
  )
}

export default Field
