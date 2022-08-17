import { FC, useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'

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

  const handleStart = () => {
    setMouseIsDown(true)
  }

  const handleDrag = () => {
    if (taskIsMoving) return false
  }

  const handleStop = () => {
    setMouseIsDown(false)
  }
  // useEffect(() => {
  //   console.log({ taskIsMoving })
  // }, [taskIsMoving])

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
          {children}
        </div>
      </Draggable>
    </div>
  )
}

export default Field
