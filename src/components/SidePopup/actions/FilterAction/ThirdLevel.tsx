import { FC } from 'react'
import cx from 'classnames'

import SecondLevel from './SecondLevel'
import Button from 'components/parts/Button/Button'
import DropDown from 'components/parts/DropDown/DropDown'

import styles from './FilterAction.module.scss'
import buttonThemes from 'components/parts/Button/ButtonThemes.module.scss'
import dropDownStyles from 'components/parts/DropDown/DropDown.module.scss'

import { IThirdLevel } from './types'

import { LogicalOperators, LogicLabels } from 'constants/sidePopup'

import { IconPlusWithBorder } from '../../../../assets/icons'

const ThirdLevel: FC<IThirdLevel> = ({
  thirdLevel,
  handleCreateFirstLevel,
  handleCreateSecondLevel,
  handleDeleteFirstLevelRow,
  secondLevelElements,
  firstLevelElements,
  index,
  updateElement,
  headers,
}) => {
  const { id, logicalOperator } = thirdLevel
  const handleCreate = (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const thirdLevelId = e.currentTarget.dataset.thirdLevelId
    console.log(e.currentTarget.dataset, thirdLevelId)
    handleCreateSecondLevel(thirdLevelId)
  }

  const handleChangeOperator = (e: any) => {
    const { operator } = e.currentTarget.dataset
    updateElement(id, 'third', { logicalOperator: operator })
  }
  return (
    <div className={styles.thirdLevelFilter}>
      <div className={styles.firstLevelFilterRightPart}>
        {index === 0 ? (
          <p>Врачи</p>
        ) : (
          <DropDown
            triggerNode={
              <Button modificator={cx(buttonThemes.theme_filter_accent)}>
                {LogicLabels[logicalOperator].toUpperCase()}
              </Button>
            }
          >
            <div className={dropDownStyles.container}>
              {Object.values(LogicalOperators).map((operator) => {
                return (
                  <button
                    key={operator}
                    className={cx(dropDownStyles.element, 'text_1')}
                    onClick={handleChangeOperator}
                    data-operator={operator}
                  >
                    {LogicLabels[operator].toUpperCase()}
                  </button>
                )
              })}
            </div>
          </DropDown>
        )}
      </div>
      <div className={styles.thirdLevelLeftPart}>
        <div className={styles.secondAddButtonContainer}>
          <Button
            modificator={buttonThemes.theme_additional}
            onClick={handleCreate}
            data-third-level-id={id}
          >
            <IconPlusWithBorder className={styles.secondAddButtonIcon} />
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
              updateElement={updateElement}
              headers={headers}
            />
          )
        })}
      </div>
    </div>
  )
}
export default ThirdLevel
