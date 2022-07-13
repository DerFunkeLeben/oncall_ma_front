import { FC } from 'react'

import FirstLevel from './FirstLevel'

import { ISecondLevel } from './types'

const SecondLevel: FC<ISecondLevel> = ({
  secondLevel,
  handleCreateFirstLevelRow,
  index,
  handleDeleteFirstLevelRow,
}) => {
  const firstRows = secondLevel.rows
  return (
    <div className="SecondLevelOperand">
      {index !== 0 && <p>И</p>}
      {firstRows.map((row, firstLevelIndex) => {
        const itsLastRow = firstLevelIndex + 1 === firstRows.length
        return (
          <FirstLevel
            index={firstLevelIndex}
            key={row.id}
            row={row}
            itsLastRow={itsLastRow}
            handleCreateFirstLevelRow={handleCreateFirstLevelRow}
            handleDeleteFirstLevelRow={handleDeleteFirstLevelRow}
          />
        )
      })}
    </div>
  )
}
export default SecondLevel
