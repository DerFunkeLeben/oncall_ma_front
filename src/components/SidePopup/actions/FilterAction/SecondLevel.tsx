import { FC } from 'react'

import FirstLevel from './FirstLevel'

import { ISecondLevel } from './types'

const SecondLevel: FC<ISecondLevel> = ({
  secondLevel,
  itsFirstChild,
  handleCreateFirstLevel,
  index,
  handleDeleteFirstLevelRow,
  firstLevelElements,
}) => {
  console.log({ secondLevel })
  return (
    <div className="SecondLevelOperand">
      {!itsFirstChild && <p>И</p>}
      {firstLevelElements.map((row, firstLevelIndex) => {
        const childIds = secondLevel.childIds
        if (!childIds.includes(row.id)) return
        const itsLastChild = childIds.indexOf(row.id) + 1 === childIds.length
        const itsFirstFirstLevelChild = childIds.indexOf(row.id) === 0
        return (
          <FirstLevel
            index={firstLevelIndex}
            parentSecondLevelId={secondLevel.id}
            key={row.id}
            row={row}
            itsLastChild={itsLastChild}
            itsFirstChild={itsFirstFirstLevelChild}
            handleCreateFirstLevel={handleCreateFirstLevel}
            handleDeleteFirstLevelRow={handleDeleteFirstLevelRow}
          />
        )
      })}
    </div>
  )
}
export default SecondLevel
