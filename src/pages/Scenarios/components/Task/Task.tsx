import { FC, useEffect, useRef, useState } from 'react'
import cx from 'classnames'
import Draggable, { DraggableData, DraggableEventHandler } from 'react-draggable'

import styles from './Task.module.scss'
import { useScenario } from '../../../../store/scenario/useScenario'

import { ITaskNode } from '../../type'

const Task: FC<ITaskNode> = ({ properties, id }) => {
  const { type } = properties
  const { setTaskIsMoving, addTask } = useScenario()

  const position = { x: 0, y: 0 }

  const handleStart = (e: Event, data: DraggableData) => {
    e.preventDefault()
    console.log('start')
    setTaskIsMoving(true)
  }

  const handleDrag = (e: Event, data: DraggableData) => {
    const draggableNode = data.node
    draggableNode.style.pointerEvents = 'none'
    e.preventDefault()
  }

  const handleStop = (e: Event, data: DraggableData) => {
    const draggableNode = data.node
    const nodeUnderMouse = e.target as HTMLDivElement
    if (nodeUnderMouse) {
      const rightNodeId = nodeUnderMouse.dataset.taskId
      if (rightNodeId) {
        console.log('ADD', rightNodeId)
        addTask(properties, rightNodeId)
      }
    }
    draggableNode.style.pointerEvents = 'all'
    e.preventDefault()
    setTaskIsMoving(false)
  }

  return (
    <Draggable
      onDrag={handleDrag as DraggableEventHandler}
      onStop={handleStop as DraggableEventHandler}
      onStart={handleStart as DraggableEventHandler}
      position={position}
    >
      <div className={styles.task} data-type={type}>
        <p className={styles.name}>{type}</p>
      </div>
    </Draggable>
  )
}

export default Task
