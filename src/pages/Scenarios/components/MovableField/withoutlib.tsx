import { FC, useEffect, useRef, useState } from 'react'

import styles from './MovableField.module.scss'

const MovableField: FC = ({ children }) => {
  const field = useRef<HTMLDivElement>(null)
  const container = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const [startPosition, setStartPosition] = useState({ mouseXofField: 0, mouseYofField: 0 })
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

  const minmax = (number: number, min: any, max: number) => {
    return Math.min(Math.max(number, min), max)
  }

  const handleMouseDown = (e: any) => {
    setMouseIsDown(true)
    const containerRect = getContainerRect()
    const mouseXofField = e.clientX - position.left - containerRect.x
    const mouseYofField = e.clientY - position.top - containerRect.y
    setStartPosition({
      mouseXofField,
      mouseYofField,
    })
  }
  const handleMouseUp = (e: any) => {
    setMouseIsDown(false)
  }

  const handleMouseMove = (e: any) => {
    if (!mouseIsDown) return
    const containerRect = getContainerRect()
    const fieldRect = getFieldRect()
    const moveLimits = {
      right: -(fieldRect.width - containerRect.width),
      left: 0,
      top: 0,
      bottom: -(fieldRect.height - containerRect.height),
    }
    const left = e.clientX - startPosition.mouseXofField - containerRect.x
    const top = e.clientY - startPosition.mouseYofField - containerRect.y
    const limitedLeft = minmax(left, moveLimits.right, moveLimits.left)
    const limitedTop = minmax(top, moveLimits.bottom, moveLimits.top)
    setPosition({
      top: limitedTop,
      left: limitedLeft,
    })
  }

  //   useEffect(() => {
  //     //нужно прекратитьдвигать где бы мы не отпустили мышь
  //     document.addEventListener('mouseup', handleMouseUp)
  //     return () => {
  //       document.removeEventListener('mouseup', handleMouseUp)
  //     }
  //   }, [])

  //   useEffect(() => {
  //     console.log(mouseIsDown)
  //   }, [mouseIsDown])

  return (
    <div className={styles.fieldConainter} ref={container as React.RefObject<HTMLDivElement>}>
      <div
        className={styles.movableField}
        ref={field as React.RefObject<HTMLDivElement>}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseUp}
        onMouseUp={handleMouseUp}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          cursor: mouseIsDown ? 'grabbing' : 'grab',
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default MovableField
