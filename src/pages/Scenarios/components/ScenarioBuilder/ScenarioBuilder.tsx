import { FC, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useParams } from 'react-router-dom'

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
  startBlockHeight: 222,
}

const { finish, list, event, start } = TasksTypes

const ScenarioBuilder: FC = () => {
  const { eventId } = useParams<{ eventId?: string }>()
  const { tasksHeap, initAllScenaries, setTasksHeap, setScenario } = useScenario()
  const [stateTasksHeap, setStateTasksHeap] = useState<ITasksHeap>({})

  useEffect(() => {
    initAllScenaries().then((allScen) => {
      const { events } = allScen.filter((scen) => scen.id === eventId)[0]
      const { audience, startDate, scenarioType } = events[1].properties
      const initTaskHeap = {
        ...events,
        '1': {
          ...events[1],
          properties: { ...audience, startDate, scenarioType },
        },
      }
      setTasksHeap(initTaskHeap)
      setScenario({ scenarioId: eventId, startDate, scenarioType })
    })
  }, [])

  useEffect(() => {
    if (!tasksHeap) return
    setStateTasksHeap(tasksHeap)
  }, [tasksHeap])

  const createMatrix = (
    id: string,
    matrix: TObject[][] = [],
    row: TObject[] = [],
    itsNewRow = true,
    columnNumber = 0
  ): any => {
    const task = stateTasksHeap[id]
    const outIds = task?.output
    if (!outIds) return

    const type = task?.type
    const newCell = { id, columnNumber, type }
    const newRow = itsNewRow ? [newCell] : [...row, newCell]
    const itsEndOfBranch = outIds.length === 0
    const newColumnNumber = columnNumber + 1

    if (itsEndOfBranch) {
      matrix.push(newRow)
      return
    } else {
      outIds.forEach((outId, index) => {
        const createNewRow = index != 0
        createMatrix(outId, matrix, newRow, createNewRow, newColumnNumber)
      })

      return matrix
    }
  }

  const getColumnNumbers = (matrix: any) => {
    return matrix.reduce((acc: { [key: string]: number }, row: any, index: any) => {
      row.forEach((el: any) => (acc[el.id] = index))
      return acc
    }, {})
  }

  const calcTaskPosition = (type: string, columnNumber: number, rowNumber: number) => {
    const paddingV = type === start ? SIZE.paddingField : SIZE.startBlockHeight / 2
    const paddingH = type === start ? SIZE.paddingField : SIZE.startBlockWidth / 2

    const leftPosition = columnNumber * (SIZE.taskWidth + SIZE.gap) + paddingH
    const topPosition = rowNumber * (SIZE.taskHeight + SIZE.gap) + paddingV
    return { leftPosition, topPosition }
  }

  const drawLine = (type: string) => {
    const length = type === finish ? 150 : 160

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

  const drawSplitLines = (outputIds: any | undefined, matrix: any) => {
    if (!outputIds?.length) return
    const columnNumbers = getColumnNumbers(matrix)

    return outputIds.map((element: any, index: any) => {
      if (index === 0) return
      const countOfRows = columnNumbers[element] - columnNumbers[outputIds[0]]
      const length = 168
      const gap = 1
      const firstPath = `M 10 24 L 10 36 M 10 50 L 10 ${length * countOfRows - gap} L 50 ${
        length * countOfRows - gap
      }`
      const secondPath = `M 10 0 L 10 ${length * countOfRows - gap} L 50 ${
        length * countOfRows - gap
      }`
      const path = index === 1 ? firstPath : secondPath
      return (
        <svg
          key={element + index}
          xmlns="http://www.w3.org/2000/svg"
          width="50"
          height={length * countOfRows}
          viewBox={`0 0 50 ${length * countOfRows}`}
          className={styles.splitLine}
          style={{ height: length * countOfRows }}
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

        const properties = { ...currentTask }

        const isStart = type === start

        const taskWithoutPlaceholder = ![finish, list, event].includes(type)

        if (isStart) {
          return <SourceTask style={style} properties={properties} id={id} />
        } else {
          return (
            <div key={id + type} style={style} className={styles.taskContainer}>
              {drawLine(type)}
              {type === 'condition' && (
                <div className={styles.splitContainer}>{drawSplitLines(outIds, renderMatrix)}</div>
              )}
              <div className={styles.leftArea} data-task-id={id}>
                <div className={styles.taskCreateArea} />
              </div>
              {taskWithoutPlaceholder && <div className={styles.placeUnderTask} />}
              <Task settings={properties} id={id} />
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
