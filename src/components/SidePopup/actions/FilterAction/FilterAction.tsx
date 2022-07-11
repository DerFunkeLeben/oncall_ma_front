import { FC, Dispatch, SetStateAction, useState, useRef } from 'react'
import cx from 'classnames'

import { IActionFilter, IState } from 'types/sidePopup'
import DropDown from 'components/parts/DropDown/DropDown'
import Button from 'components/parts/Button/Button'
import { makeId } from 'utils'

import styles from './FilterAction.module.scss'
import buttonThemes from 'components/parts/Button/ButtonThemes.module.scss'
import { IconPlus } from '../../../../assets/icons'

interface IFilterAction {
  currentState: IState
  action: IActionFilter
  setState: Dispatch<SetStateAction<IState>> /* TODO хуйня какая то */
}

interface IRow {
  id: string
  defined: string
  condition: string
  determinant: string
}
interface ISecondLevel {
  id: string
  type: string
  rows: IRow[]
}
interface IThirdLevel {
  id: string
  type: string
  rows: ISecondLevel[]
}

type IConfig = IThirdLevel[]

interface IFirstLevelRow {
  index: number
  row: IRow
  handleCreateFirstLevelRow: (e: any) => void
}
interface ISecondLevelRow {
  secondLevel: ISecondLevel
  handleCreateFirstLevelRow: (e: any) => void
}

interface IThirdLevelRow {
  thirdLevel: IThirdLevel
  handleAddSecondLevel: (e: any) => void
  handleCreateFirstLevelRow: (e: any) => void
}

const FilterAction: FC<IFilterAction> = ({ action, currentState, setState }) => {
  const actionName = action.name
  const title = action.title

  const initFirstLevelRow: IRow = {
    defined: 'специальность',
    condition: 'содержит',
    determinant: 'Урология',
    id: makeId(10),
  }

  const initSecondLevelRow: ISecondLevel = {
    id: makeId(10),
    type: 'И',
    rows: [initFirstLevelRow],
  }

  const initThirdLevelRow: IThirdLevel = {
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
      console.log(element, targetId)
      if (element.id === targetId) {
        console.log('!', element)
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
    console.log(id)
  }

  const handleAddThirdLevel = () => {
    setFiterConfig([...filterConfig, initThirdLevelRow])
  }

  const handleAddSecondLevel = (e: any) => {
    const { id } = e.currentTarget.dataset
    console.log({ id })
    // const act = (thirdLevelRow) => {
    //   const newThirdLevelRow
    // }
    // findAndImplement(id, filterConfig, act)
    // setFiterConfig([...filterConfig, initThirdLevelRow])
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.filterContainer}>
        {filterConfig.map((thirdLevel, thirdLevelIndex) => {
          return (
            <ThirdLevelRow
              key={thirdLevelIndex}
              thirdLevel={thirdLevel}
              handleCreateFirstLevelRow={handleCreateFirstLevelRow}
              handleAddSecondLevel={handleAddSecondLevel}
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

const FirstLevelRow: FC<IFirstLevelRow> = ({ index, handleCreateFirstLevelRow, row }) => {
  const { defined, condition, determinant, id } = row
  return (
    <div className={cx(styles.firstLevelOperand)}>
      <div className={cx(styles.filterElement, styles.leftGap)}>
        {index === 0 && <p>у которых</p>}
      </div>
      <p className={styles.filterElement}>{defined}</p>
      <p className={styles.filterElement}>{condition}</p>
      <p className={styles.filterElement}>{determinant}</p>
      <Button
        modificator={buttonThemes.theme_secondary}
        onClick={handleCreateFirstLevelRow}
        data-id={id}
      >
        <IconPlus />
      </Button>
    </div>
  )
}

const SecondLevelRow: FC<ISecondLevelRow> = ({ secondLevel, handleCreateFirstLevelRow }) => {
  const firstRows = secondLevel.rows
  return (
    <div className="SecondLevelOperand">
      <p>И</p>
      {firstRows.map((row, index) => {
        return (
          <FirstLevelRow
            index={index}
            key={row.id}
            row={row}
            handleCreateFirstLevelRow={handleCreateFirstLevelRow}
          />
        )
      })}
    </div>
  )
}

const ThirdLevelRow: FC<IThirdLevelRow> = ({
  thirdLevel,
  handleCreateFirstLevelRow,
  handleAddSecondLevel,
}) => {
  const secondRows = thirdLevel.rows
  const id = thirdLevel.id
  return (
    <div className={styles.thirdLevelFilter}>
      <div className="firstLevelFilterRightPart">
        <p>Врачи</p>
      </div>
      <div className={styles.thirdLevelLeftPart}>
        <div className={styles.secondAddButtonContainer}>
          <Button
            modificator={buttonThemes.theme_secondary}
            onClick={handleAddSecondLevel}
            data-id={id}
          >
            <IconPlus />
          </Button>
        </div>
        {secondRows.map((secondLevel, secondIndex) => (
          <SecondLevelRow
            secondLevel={secondLevel}
            key={secondIndex}
            handleCreateFirstLevelRow={handleCreateFirstLevelRow}
          />
        ))}
      </div>
    </div>
  )
}
