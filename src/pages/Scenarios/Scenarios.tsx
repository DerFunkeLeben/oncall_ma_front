import { FC, useState } from 'react'
import { v4 as uuid } from 'uuid'

import Sidebar from 'components/Sidebar/Sidebar'
import PageHead from 'components/PageHead/PageHead'

import styles from './Scenarios.module.scss'

import { IAction, IActionHeap, TObject } from './type'

const Scenarios: FC = () => {
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
      out: ['6'],
    },
    '4': {
      in: ['2'],
      out: ['5'],
    },
    '5': {
      in: ['4'],
      out: ['8', '9'],
    },
    '6': {
      in: ['3'],
      out: ['10', '11'],
    },
    '8': {
      in: ['5'],
      out: [],
    },
    '9': {
      in: ['5'],
      out: [],
    },
    '10': {
      in: ['6'],
      out: [],
    },
    '11': {
      in: ['6'],
      out: ['12'],
    },
    '12': {
      in: ['11'],
      out: ['13', '14'],
    },
    '13': {
      in: ['12'],
      out: [],
    },
    '14': {
      in: ['12'],
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

  const CELLSIZE = {
    width: 100,
    height: 100,
  }

  const render = () => {
    const rootId = '1'
    const matrix = createMatrix(rootId)
    return matrix.map((row: any, index: any) => {
      return row.map((action: any) => {
        const { id, columnNumber } = action
        const style = {
          left: `${columnNumber * CELLSIZE.width}px`,
          top: `${index * CELLSIZE.height}px`,
        }
        return (
          <div key={id} style={style} className={styles.action}>
            {id}
          </div>
        )
      })
    })
  }

  return (
    <div className={styles.page}>
      <Sidebar />
      <div className={styles.pageContent}>
        <PageHead title="Сценарии" />
        <div className={styles.scena}>{render()}</div>
      </div>
    </div>
  )
}

export default Scenarios
