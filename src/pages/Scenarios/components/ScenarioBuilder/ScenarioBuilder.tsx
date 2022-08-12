import { FC, useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

import Sidebar from 'components/Sidebar/Sidebar'
import PageHead from 'components/PageHead/PageHead'
import Action from '../Action/Action'

import styles from './ScenarioBuilder.module.scss'

import { IAction, IActionHeap, TObject } from './type'
import MovableField from '../MovableField/MovableField'

const SIZE = {
  actionWidth: 50,
  actionHeight: 50,
  gap: 50,
  padding: 100,
}

const ScenarioBuilder: FC = () => {
  const [actionHeap, setActionHeap] = useState<IActionHeap>({
    '1': {
      in: [],
      out: ['2'],
    },
    '2': {
      in: ['1'],
      out: ['3', '4'],
    },
    '3': {
      in: ['2'],
      out: [],
    },
    '4': {
      in: ['2'],
      out: [],
    },
  })

  const createMatrix = (
    id: string,
    matrix: TObject[][] = [],
    row: TObject[] = [],
    itsNewRow = true,
    columnNumber = 0
  ): any => {
    const action = actionHeap[id]
    const rowUpd = itsNewRow ? [{ id, columnNumber }] : [...row, { id, columnNumber }]
    const outIds = action?.out
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

  const addActivity = (e: any) => {
    //TODO некрасиво написано
    const newActionId = uuid()

    //Обновление In для соседа справа
    const rightActionId = e.currentTarget.dataset.actionId
    const rightAction = actionHeap[rightActionId]
    const rightInUpd = [newActionId]
    const rightActionUpd = { ...rightAction, in: rightInUpd }

    //Обновление Out для соседа слева
    const leftActionId = rightAction.in[0]
    const leftAction = actionHeap[leftActionId]
    const leftOutUpd = leftAction.out.map((outId) => {
      const result = outId === rightActionId ? newActionId : outId
      return result
    })
    const leftActionUpd = { ...leftAction, out: leftOutUpd }

    //Создание нового элемента
    const newAction = {
      in: [leftActionId],
      out: [rightActionId],
    }

    setActionHeap({
      ...actionHeap,
      [leftActionId]: leftActionUpd,
      [rightActionId]: rightActionUpd,
      [newActionId]: newAction,
    })
  }

  const render = () => {
    const rootId = '1'
    const matrix = createMatrix(rootId)
    return matrix.map((row: any, index: any) => {
      return row.map((action: any) => {
        const { id, columnNumber } = action
        const leftPosition = columnNumber * (SIZE.actionWidth + SIZE.gap) + SIZE.padding
        const topPosition = index * (SIZE.actionHeight + SIZE.gap) + SIZE.padding
        const style = {
          left: `${leftPosition}px`,
          top: `${topPosition}px`,
        }

        return (
          <div key={id} style={style} className={styles.actionContainer}>
            <div className={styles.actionCreateArea} data-action-id={id} onClick={addActivity} />
            <Action name={`${columnNumber}-${index}`}></Action>
          </div>
        )
      })
    })
  }

  useEffect(() => {
    console.log(actionHeap)
  }, [actionHeap])

  return (
    <div className={styles.scenarioBuilder}>
      <MovableField>{render()}</MovableField>
    </div>
  )
}

export default ScenarioBuilder
