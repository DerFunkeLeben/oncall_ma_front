import { FC } from 'react'

import SecondLevel from './SecondLevel'
import Button from 'components/parts/Button/Button'

import styles from './FilterAction.module.scss'
import buttonThemes from 'components/parts/Button/ButtonThemes.module.scss'
import { IThirdLevel } from './types'

import { IconPlus } from '../../../../assets/icons'

const ThirdLevel: FC<IThirdLevel> = ({
  thirdLevel,
  handleCreateFirstLevelRow,
  handleAddSecondLevel,
  handleDeleteFirstLevelRow,
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
        {secondRows.map((secondLevel, secondLevelIndex) => (
          <SecondLevel
            index={secondLevelIndex}
            secondLevel={secondLevel}
            key={secondLevel.id}
            handleCreateFirstLevelRow={handleCreateFirstLevelRow}
            handleDeleteFirstLevelRow={handleDeleteFirstLevelRow}
          />
        ))}
      </div>
    </div>
  )
}
export default ThirdLevel
