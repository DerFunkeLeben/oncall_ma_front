import { FC, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

import Sidebar from 'components/Sidebar/Sidebar'
import PageHead from 'components/PageHead/PageHead'
import Task from '../Task/Task'
import SourceTask from '../SourceTask/SourceTask'

import styles from './ScenarioBuilder.module.scss'

import { ITask, ITasksHeap, TObject } from 'types'
import { TasksTypes, TasksDefaultNames } from 'types'
import Field from '../Field/Field'
import Lines from '../Lines/Lines'

import { useScenario } from '../../../../store/scenario/useScenario'

const SIZE = {
  taskWidth: 80,
  taskHeight: 88,
  gap: 80,
  paddingField: 45,
  startBlockWidth: 150,
  startBlockHeight: 200,
}

const { exit, list, event, start } = TasksTypes

const ScenarioBuilder: FC = () => {
  const { tasksHeap, taskIsMoving } = useScenario()
  const [stateTasksHeap, setStateTasksHeap] = useState<ITasksHeap>({})

  useEffect(() => {
    if (!tasksHeap) return
    setStateTasksHeap(tasksHeap)
  }, [tasksHeap])

  const createMatrix = (
    id: string,
    matrix: TObject[][] = [],
    row: TObject[] = [],
    itsNewRow = true,
    columnNumber = 0,
    rowNumber = 0
  ): any => {
    const task = stateTasksHeap[id]
    const outIds = task?.output
    const type = task?.type
    console.log(type, rowNumber)
    const newCell = { id, columnNumber, type }
    const newRow = itsNewRow ? [newCell] : [...row, newCell]

    if (!outIds) return
    const itsEndOfBranch = outIds.length === 0
    const newColumnNumber = columnNumber + 1

    if (itsEndOfBranch) {
      matrix.push(newRow)
      return
    }

    outIds.forEach((outId, index) => {
      const createNewRow = index != 0
      const newRowNumber = createNewRow ? rowNumber + 1 : rowNumber
      createMatrix(outId, matrix, newRow, createNewRow, newColumnNumber, newRowNumber)
    })

    return matrix
  }

  const calcTaskPosition = (type: string, columnNumber: number, rowNumber: number) => {
    const paddingV = type === start ? SIZE.paddingField : SIZE.startBlockHeight / 2
    const paddingH = type === start ? SIZE.paddingField : SIZE.startBlockWidth / 2

    const leftPosition = columnNumber * (SIZE.taskWidth + SIZE.gap) + paddingH
    const topPosition = rowNumber * (SIZE.taskHeight + SIZE.gap) + paddingV
    return { leftPosition, topPosition }
  }

  const drawLine = (type: string) => {
    const length = type === exit ? 150 : 320

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={length}
        height="88"
        viewBox={`0 0 ${length} 88`}
        className={styles.line}
      >
        <g id="icon">
          <path
            id="path"
            data-name="path"
            d={`M 0 44 L ${length} 44`}
            fill="none"
            strokeWidth="2"
            stroke="#8D87AC"
          />
        </g>
      </svg>
    )
  }

  const drawSplitLines = (outputIds: number | undefined) => {
    if (!outputIds) return
    return [...Array(outputIds - 1).keys()].map((element, index) => {
      const firstPath = 'M 10 24 L 10 36 M 10 50 L 10 167 L 50 167'
      const secondPath = 'M 10 0 L 10 167 L 50 167'
      const path = index === 0 ? firstPath : secondPath
      return (
        <svg
          key={element + index}
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height="168"
          viewBox={`0 0 50 168`}
          className={styles.splitLine}
        >
          <g id="icon">
            <path
              id="path"
              data-name="path"
              d={path}
              fill="none"
              strokeWidth="2"
              stroke="#8D87AC"
            />
          </g>
        </svg>
      )
    })
  }

  const renderTasks = () => {
    const rootId = '1'
    const renderMatrix = createMatrix(rootId)
    if (!renderMatrix) return
    console.log(renderMatrix)
    return renderMatrix.map((row: any, index: any) => {
      return row.map((task: any) => {
        const { id, columnNumber, type } = task
        const { leftPosition, topPosition } = calcTaskPosition(type, columnNumber, index)

        const style = {
          left: `${leftPosition}px`,
          top: `${topPosition}px`,
        }

        const currentTask = stateTasksHeap[id]
        const outIds = currentTask?.output

        const properties = { ...currentTask, status: 'default' }

        const isStart = type === start

        const taskWithoutPlaceholder = ![exit, list, event].includes(type)

        if (isStart) {
          return <SourceTask style={style} />
        } else {
          return (
            <div key={id + type} style={style} className={styles.taskContainer}>
              {drawLine(type)}
              <div className={styles.splitContainer}>{drawSplitLines(outIds?.length)}</div>
              <div className={styles.leftArea} data-task-id={id}>
                <div className={styles.taskCreateArea} />
              </div>
              {taskWithoutPlaceholder && <div className={styles.placeUnderTask} />}
              <Task properties={properties} id={id} />
            </div>
          )
        }
      })
    })
  }

  return (
    <div className={styles.scenarioBuilder}>
      <Field>{renderTasks()}</Field>
    </div>
  )
}

export default ScenarioBuilder
