import { FC, Dispatch, SetStateAction, useState, useRef, useEffect } from 'react'
import cx from 'classnames'

import Button from 'components/parts/Button/Button'
import ThirdLevel from './ThirdLevel'

import { makeId } from 'utils'

import styles from './FilterAction.module.scss'
import buttonThemes from 'components/parts/Button/ButtonThemes.module.scss'
import { IconPlus } from '../../../../assets/icons'

import { IFilterAction, IFirstLevelObj, ISecondLevelObj, IThirdLevelObj, IConfig } from './types'

const FilterAction: FC<IFilterAction> = ({ action, currentState, setState }) => {
  const actionName = action.name
  const title = action.title

  const initFirstLevelRow: IFirstLevelObj = {
    defined: 'и',
    condition: 'содержит',
    determinant: 'Урология',
    id: makeId(10),
  }

  const initSecondLevelRow: ISecondLevelObj = {
    id: makeId(10),
    type: 'И',
    rows: [initFirstLevelRow],
  }

  const initThirdLevelRow: IThirdLevelObj = {
    id: makeId(10),
    type: 'И',
    rows: [initSecondLevelRow],
  }

  const [filterConfig, setFiterConfig] = useState<IConfig>([
    {
      type: 'И',
      id: makeId(10),
      rows: [
        {
          type: 'И',
          id: makeId(10),
          rows: [
            {
              defined: 'специальность',
              condition: 'содержит',
              determinant: 'Урология',
              id: makeId(10),
            },
            {
              defined: 'и',
              condition: 'содержит',
              determinant: 'Урология',
              id: makeId(10),
            },
          ],
        },
      ],
    },
  ])

  const findAndImplement = (targetId: string, config: IConfig, act: any) => {
    config.forEach((element: any) => {
      if (element.id === targetId) {
        act(element, config)
        return
      } else {
        const rows = element.rows
        if (rows) findAndImplement(targetId, rows, act)
        else return
      }
    })
  }

  const handleCreateFirstLevelRow = (e: any) => {
    const { id } = e.currentTarget.dataset
    const act = (firstLevelRow: any, config: any) => {
      config.push(initFirstLevelRow)
      setFiterConfig([...filterConfig])
    }
    findAndImplement(id, filterConfig, act)
  }

  const handleAddThirdLevel = () => {
    setFiterConfig([...filterConfig, initThirdLevelRow])
  }

  const handleAddSecondLevel = (e: any) => {
    const { id } = e.currentTarget.dataset
    const act = (thirdLevelRow: any) => {
      thirdLevelRow.rows.push(initSecondLevelRow)
      setFiterConfig([...filterConfig])
    }
    findAndImplement(id, filterConfig, act)
  }

  const mutateDelFromArr = (arr: any[], id?: string) => {
    if (!id) {
      arr.length = 0
    }
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        arr.splice(i, 1)
      }
    }
  }

  const cleanEmptyParent = (config: IConfig) => {
    config.forEach((element: any) => {
      const { rows, id } = element
      if (!rows) return
      if (rows.length === 0) {
        mutateDelFromArr(config, id)
      } else {
        cleanEmptyParent(rows)
      }
    })
  }

  const handleDeleteFirstLevelRow = (e: any) => {
    const { id, index } = e.currentTarget.dataset
    const act = (firstLevelRow: any, config: any) => {
      if (index !== '0') {
        mutateDelFromArr(config, id)
      } else mutateDelFromArr(config)
      setFiterConfig([...filterConfig])
    }
    findAndImplement(id, filterConfig, act)
    cleanEmptyParent(filterConfig)
  }

  useEffect(() => {
    console.log(filterConfig)
  }, [filterConfig])

  return (
    <div className={styles.wrapper}>
      <div className={styles.filterContainer}>
        {filterConfig.map((thirdLevel, thirdLevelIndex) => {
          return (
            <ThirdLevel
              index={thirdLevelIndex}
              key={thirdLevelIndex}
              thirdLevel={thirdLevel}
              handleCreateFirstLevelRow={handleCreateFirstLevelRow}
              handleAddSecondLevel={handleAddSecondLevel}
              handleDeleteFirstLevelRow={handleDeleteFirstLevelRow}
            />
          )
        })}
      </div>
      <div className={styles.controlContainer}>
        <Button modificator={buttonThemes.theme_secondary} onClick={handleAddThirdLevel}>
          И
        </Button>
        <Button modificator={buttonThemes.theme_secondary}>ИЛИ</Button>
        <Button modificator={buttonThemes.theme_secondary}>НЕ И</Button>
        <Button modificator={buttonThemes.theme_secondary}>НЕ ИЛИ</Button>
      </div>
    </div>
  )
}

export default FilterAction
