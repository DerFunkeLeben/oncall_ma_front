import { FC } from 'react'

import SecondLevel from './SecondLevel'
import Button from 'components/parts/Button/Button'

import styles from './FilterAction.module.scss'
import buttonThemes from 'components/parts/Button/ButtonThemes.module.scss'
import { IThirdLevel } from './types'

import { IconPlus } from '../../../../assets/icons'

const ThirdLevel: FC<IThirdLevel> = ({
  thirdLevel,
  handleCreateFirstLevel,
  handleCreateSecondLevel,
  handleDeleteFirstLevelRow,
  secondLevelElements,
  firstLevelElements,
  index,
  updateElement,
}) => {
  const { id, logicalOperator } = thirdLevel
  const handleCreate = (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const thirdLevelId = e.currentTarget.dataset.thirdLevelId
    console.log(e.currentTarget.dataset, thirdLevelId)
    handleCreateSecondLevel(thirdLevelId)
  }
  return (
    <div className={styles.thirdLevelFilter}>
      <div className="firstLevelFilterRightPart">
        {index === 0 ? (
          <p>Врачи</p>
        ) : (
          <Button
            modificator={buttonThemes.theme_secondary}
            onClick={() => updateElement(id, 'third', { logicalOperator: 'или' })}
          >
            {logicalOperator}
          </Button>
        )}
      </div>
      <div className={styles.thirdLevelLeftPart}>
        <div className={styles.secondAddButtonContainer}>
          <Button
            modificator={buttonThemes.theme_secondary}
            onClick={handleCreate}
            data-third-level-id={id}
          >
            <IconPlus />
          </Button>
        </div>
        {secondLevelElements.map((secondLevel, secondLevelIndex) => {
          const childIds = thirdLevel.childIds
          if (!childIds.includes(secondLevel.id)) return
          const itsFirstChild = childIds.indexOf(secondLevel.id) === 0
          return (
            <SecondLevel
              itsFirstChild={itsFirstChild}
              index={secondLevelIndex}
              secondLevel={secondLevel}
              key={secondLevel.id}
              handleCreateFirstLevel={handleCreateFirstLevel}
              handleDeleteFirstLevelRow={handleDeleteFirstLevelRow}
              firstLevelElements={firstLevelElements}
            />
          )
        })}
      </div>
    </div>
  )
}
export default ThirdLevel
