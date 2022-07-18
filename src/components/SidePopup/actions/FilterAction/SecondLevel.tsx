import { FC } from 'react'
import cx from 'classnames'

import FirstLevel from './FirstLevel'
import DropDown from 'components/parts/DropDown/DropDown'
import Button from 'components/parts/Button/Button'

import dropDownStyles from 'components/parts/DropDown/DropDown.module.scss'
import buttonThemes from 'components/parts/Button/ButtonThemes.module.scss'
import styles from './FilterAction.module.scss'

import { ISecondLevel } from './types'

import { LogicalOperators } from 'constants/sidePopupConsts'

const SecondLevel: FC<ISecondLevel> = ({
  secondLevel,
  itsFirstChild,
  handleCreateFirstLevel,
  index,
  handleDeleteFirstLevelRow,
  firstLevelElements,
  updateElement,
  headers,
}) => {
  const { id, logicalOperator } = secondLevel
  const handleChangeOperator = (e: any) => {
    const { operator } = e.currentTarget.dataset
    updateElement(id, 'second', { logicalOperator: operator })
  }
  return (
    <div className={styles.secondLevelOperand}>
      <div
        className={cx(
          styles.logicalOperatorContener,
          !itsFirstChild && styles.logicalOperatorContenerNotFirst
        )}
      >
        {!itsFirstChild && (
          <DropDown
            triggerNode={
              <Button modificator={cx(buttonThemes.theme_filter_accent)}>
                {logicalOperator.toLowerCase()}
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
                    {operator.toLowerCase()}
                  </button>
                )
              })}
            </div>
          </DropDown>
        )}
      </div>
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
            updateElement={updateElement}
            headers={headers}
          />
        )
      })}
    </div>
  )
}
export default SecondLevel
