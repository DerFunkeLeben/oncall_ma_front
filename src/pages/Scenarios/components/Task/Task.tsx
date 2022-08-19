import { FC, useEffect, useRef, useState } from 'react'
import cx from 'classnames'
import Draggable, { DraggableData, DraggableEventHandler } from 'react-draggable'
import { v4 as uuid } from 'uuid'

import TaskIcon from './components/TaskIcon'

import styles from './Task.module.scss'
import { useScenario } from '../../../../store/scenario/useScenario'
import { IconPlus } from 'assets/icons'

import { ITaskNode } from '../../type'

import { TasksTypes, TasksDefaultNames } from 'types'

const { exit } = TasksTypes

const Task: FC<ITaskNode> = ({ properties, id }) => {
  const { type, color, status, name } = properties
  const { setTaskIsMoving, addTask, deleteTask } = useScenario()

  const position = { x: 0, y: 0 }

  const isTaskPlacedInScenario = Boolean(id)
  const myId = isTaskPlacedInScenario ? (id as string) : uuid()

  const isDeleteAvailable = () => {
    const typeAllowsToBeDeleted = ![exit].includes(type)
    return isTaskPlacedInScenario && typeAllowsToBeDeleted
  }

  const isDraggable = ![exit].includes(type)

  const handleStart = (e: Event, data: DraggableData) => {
    e.preventDefault()
    setTaskIsMoving(true)
    if (!isDraggable) return false
  }

  const handleDrag = (e: Event, data: DraggableData) => {
    const draggableNode = data.node
    draggableNode.style.pointerEvents = 'none'
    draggableNode.style.zIndex = '9999'
    // document.body.style.cursor = 'grabbing'
    e.preventDefault()
    e.stopPropagation()
  }

  const handleStop = (e: Event, data: DraggableData) => {
    const draggableNode = data.node
    const nodeUnderMouse = e.target as HTMLDivElement
    console.log(nodeUnderMouse)
    if (nodeUnderMouse) {
      const rightNodeId = nodeUnderMouse.dataset.taskId
      if (rightNodeId) {
        const newTaskId = uuid()
        addTask(properties, newTaskId, rightNodeId)
      }
    }
    draggableNode.style.pointerEvents = 'all'
    draggableNode.style.zIndex = 'inherit'
    e.preventDefault()
    // document.body.style.cursor = 'inherit'
    setTaskIsMoving(false)
  }

  return (
    <Draggable
      onDrag={handleDrag as DraggableEventHandler}
      onStop={handleStop as DraggableEventHandler}
      onStart={handleStart as DraggableEventHandler}
      position={position}
    >
      <div
        className={cx(!isTaskPlacedInScenario && styles.inStorage, styles.task)}
        data-type={type}
      >
        <div className={styles.taskIconContainer}>
          <TaskIcon type={type} status={status} color={color} />
        </div>
        <p className={cx(styles.name, 'text_05')}>{name}</p>
        <div className={styles.hoverBlock}>
          {isDeleteAvailable() && (
            <div className={styles.iconClose} onClick={() => deleteTask(myId)}>
              <IconPlus />
            </div>
          )}
        </div>
      </div>
    </Draggable>
  )
}

export default Task
