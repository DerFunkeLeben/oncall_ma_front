import { FC, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

import Sidebar from 'components/Sidebar/Sidebar'
import PageHead from 'components/PageHead/PageHead'
import Task from '../Task/Task'

import styles from './ScenarioBuilder.module.scss'

import { ITask, ITasksHeap, TObject } from 'types'
import Field from '../Field/Field'

import { useScenario } from '../../../../store/scenario/useScenario'

const SIZE = {
  taskWidth: 50,
  taskHeight: 50,
  gap: 80,
  padding: 100,
}

const ScenarioBuilder: FC = () => {
  const { tasksHeap } = useScenario()
  const [stateTasksHeap, setStateTasksHeap] = useState<ITasksHeap>({})

  useEffect(() => {
    if (!tasksHeap) return
    console.log(tasksHeap)
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
    const rowUpd = itsNewRow ? [{ id, columnNumber }] : [...row, { id, columnNumber }]
    const outIds = task?.output
    if (!outIds) return
    const itsEndOfBranch = outIds.length === 0
    const newColumnNumber = columnNumber + 1

    if (itsEndOfBranch) {
      matrix.push(rowUpd)
      return
    }

    outIds.forEach((outId, index) => {
      const createNewRow = index != 0
      createMatrix(outId, matrix, rowUpd, createNewRow, newColumnNumber)
    })

    return matrix
  }

  const render = () => {
    const rootId = '1'
    const matrix = createMatrix(rootId)
    if (!matrix) return
    return matrix.map((row: any, index: any) => {
      return row.map((task: any) => {
        const { id, columnNumber } = task
        const leftPosition = columnNumber * (SIZE.taskWidth + SIZE.gap) + SIZE.padding
        const topPosition = index * (SIZE.taskHeight + SIZE.gap) + SIZE.padding
        const style = {
          left: `${leftPosition}px`,
          top: `${topPosition}px`,
        }
        const currentTask = stateTasksHeap[id]

        return (
          <div key={id} style={style} className={styles.taskContainer}>
            <div className={styles.leftArea}>
              <div className={styles.taskCreateArea} data-task-id={id} />
            </div>
            <div className={styles.placeUnderTask} />
            <Task properties={currentTask} id={id}></Task>
          </div>
        )
      })
    })
  }

  return (
    <div className={styles.scenarioBuilder}>
      <Field>{render()}</Field>
    </div>
  )
}

export default ScenarioBuilder
