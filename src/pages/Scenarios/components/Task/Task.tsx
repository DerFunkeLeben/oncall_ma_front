import { FC, useEffect, useRef, useState } from 'react'
import cx from 'classnames'
import Draggable, { DraggableData, DraggableEventHandler } from 'react-draggable'
import { v4 as uuid } from 'uuid'
import TaskIcon from '../TaskIcon/TaskIcon'
import styles from './Task.module.scss'
import { useScenario } from '../../../../store/scenario/useScenario'
import { IconPlus } from 'assets/icons'

import { ITaskNode } from '../../type'
import { TasksTypes, TasksDefaultNames } from 'types'
import { SidePopupActions } from 'constants/sidePopup'
import SidePopup from 'components/SidePopup/SidePopup'
import { ISidePopupStep } from 'types/sidePopup'
import configs from './configs'

const { exit } = TasksTypes

const Task: FC<ITaskNode> = ({ properties, id }) => {
  const { type, color, status, name, settings } = properties
  const { setTaskIsMoving, addTask, deleteTask, updateSettings } = useScenario()
  // const [popupTempSettings, setPopupTempSettings] = useState<{ [key: string]: string } | null>(null)
  const [wasMoved, setWasMoved] = useState(false)
  const [popupIsOpen, setPopupIsOpen] = useState(false)
  const config = configs[type]

  // const currentPopupSettings = popupTempSettings ? popupTempSettings : settings

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
    setWasMoved(true)
    // document.body.style.cursor = 'grabbing'
    e.preventDefault()
    e.stopPropagation()
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
    if (!wasMoved) setPopupIsOpen(true)
    draggableNode.style.pointerEvents = 'all'
    draggableNode.style.zIndex = '10'
    e.preventDefault()
    // document.body.style.cursor = 'inherit'
    setTaskIsMoving(false)
    setWasMoved(false)
  }

  const save = (newSettings: any) => {
    if (!id) return
    if (!newSettings) return
    console.log('save', newSettings)
    // setPopupTempSettings(null)
    updateSettings(id, newSettings)
  }

  const closePopup = () => {
    // setPopupTempSettings(null)
    setPopupIsOpen(false)
  }

  return (
    <>
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
      {config && (
        <SidePopup
          isOpen={popupIsOpen}
          close={closePopup}
          config={config}
          handleSave={save}
          title={config.title ? config.title : config.name}
          savedSettings={settings}
          type={type}
        />
      )}
    </>
  )
}

export default Task
