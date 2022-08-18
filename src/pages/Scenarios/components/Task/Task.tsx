import { FC, useEffect, useRef, useState } from 'react'
import cx from 'classnames'
import Draggable, { DraggableData, DraggableEventHandler } from 'react-draggable'
import { v4 as uuid } from 'uuid'

import styles from './Task.module.scss'
import { useScenario } from '../../../../store/scenario/useScenario'
import {
  IconPlus,
  IconTaskAbTest,
  IconTaskAssigment,
  IconTaskCrmMessage,
  IconTaskEmail,
  IconTaskEvent,
  IconTaskExit,
  IconTaskJoin,
  IconTaskList,
  IconTaskPush,
  IconTaskQuestion,
  IconTaskSms,
  IconTaskTelega,
  IconTaskWait,
} from 'assets/icons'

import { ITaskNode } from '../../type'

const SIZE = {
  taskWidth: 50,
  taskHeight: 50,
  gap: 80,
  padding: 100,
}

const taskIcons = {
  sms: <IconTaskSms />,
  email: <IconTaskWait />,
  sms: <IconTaskTelega />,
  sms: <IconTaskQuestion />,
  sms: <IconTaskPush />,
  sms: <IconTaskList />,
  sms: <IconTaskJoin />,
  sms: <IconTaskExit />,
  sms: <IconTaskEvent />,
  sms: <IconTaskEmail />,
  sms: <IconTaskCrmMessage />,
  sms: <IconTaskAssigment />,
  sms: <IconTaskAbTest />,
}

const Task: FC<ITaskNode> = ({ properties, id }) => {
  const { type } = properties
  const { setTaskIsMoving, addTask, deleteTask } = useScenario()

  const isTaskPlacedInScenario = Boolean(id)
  const myId = isTaskPlacedInScenario ? (id as string) : uuid()

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
        const newTaskId = uuid()
        addTask(properties, newTaskId, rightNodeId)
      }
    }
    draggableNode.style.pointerEvents = 'all'
    e.preventDefault()
    setTaskIsMoving(false)
  }

  const isDeleteAvailable = () => {
    const typeAllowsToBeDeleted = !['exit', 'start'].includes(type)
    return isTaskPlacedInScenario && typeAllowsToBeDeleted
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
        <div className={styles.taskIconContainer}></div>
        <p className={cx(styles.name, 'text_05')}>{type}</p>
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
