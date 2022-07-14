import { FC } from 'react'
import cx from 'classnames'

import Button from 'components/parts/Button/Button'
import DropDown from 'components/parts/DropDown/DropDown'

import { IFirstLevel } from './types'

import styles from './FilterAction.module.scss'
import buttonThemes from 'components/parts/Button/ButtonThemes.module.scss'
import dropDownStyles from 'components/parts/DropDown/DropDown.module.scss'

import { PositiveLogicalOperators, Conditions } from 'constants/sidePopup'

import { IconPlus } from '../../../../assets/icons'
import InputBase from 'components/parts/InputBase/InputBase'

const FirstLevel: FC<IFirstLevel> = ({
  index,
  row,
  itsLastChild,
  itsFirstChild,
  handleCreateFirstLevel,
  handleDeleteFirstLevelRow,
  parentSecondLevelId,
  updateElement,
  headers,
}) => {
  const { defined, condition, determinant, id, logicalOperator } = row
  const handleCreate = (e: any) => {
    const secondLevelId = e.currentTarget.dataset.parentSecondLevelId
    handleCreateFirstLevel(secondLevelId)
  }
  const handleDelete = (e: any) => {
    const secondLevelId = e.currentTarget.dataset.parentSecondLevelId
    const firstLevelId = e.currentTarget.dataset.id
    handleDeleteFirstLevelRow(firstLevelId, secondLevelId)
  }
  const handleChangeOperator = (e: any) => {
    const { operator } = e.currentTarget.dataset
    updateElement(id, 'first', { logicalOperator: operator })
  }
  const handleChangeCondition = (e: any) => {
    const targetCondition = e.currentTarget.dataset.condition
    updateElement(id, 'first', { condition: targetCondition })
  }
  const handleChangeDefined = (e: any) => {
    const headerElement = e.currentTarget.dataset.defined
    updateElement(id, 'first', { defined: headerElement })
  }
  const handleDeterminantInput = (e: any) => {
    updateElement(id, 'first', { determinant: e.target.value })
  }
  return (
    <div className={cx(styles.firstLevelOperand)}>
      <div className={styles.firstLevelOperandContent}>
        <div className={cx(styles.filterElement, styles.leftGap)}>
          {itsFirstChild && <p>у которых</p>}
        </div>
        {itsFirstChild ? (
          <DropDown
            triggerNode={
              <Button modificator={buttonThemes.theme_secondary}>{defined.toUpperCase()}</Button>
            }
          >
            <div className={dropDownStyles.container}>
              {headers.map((headerElement) => {
                return (
                  <button
                    key={headerElement}
                    className={dropDownStyles.element}
                    onClick={handleChangeDefined}
                    data-defined={headerElement}
                  >
                    {headerElement.toUpperCase()}
                  </button>
                )
              })}
            </div>
          </DropDown>
        ) : (
          <DropDown
            triggerNode={
              <Button modificator={buttonThemes.theme_secondary}>
                {logicalOperator.toUpperCase()}
              </Button>
            }
          >
            <div className={dropDownStyles.container}>
              {Object.values(PositiveLogicalOperators).map((operator) => {
                return (
                  <button
                    key={operator}
                    className={dropDownStyles.element}
                    onClick={handleChangeOperator}
                    data-operator={operator}
                  >
                    {operator.toUpperCase()}
                  </button>
                )
              })}
            </div>
          </DropDown>
        )}
        <DropDown
          triggerNode={
            <Button modificator={buttonThemes.theme_secondary}>{condition.toUpperCase()}</Button>
          }
        >
          <div className={dropDownStyles.container}>
            {Object.values(Conditions).map((currentCondition) => {
              return (
                <button
                  key={currentCondition}
                  className={dropDownStyles.element}
                  onClick={handleChangeCondition}
                  data-condition={currentCondition}
                >
                  {currentCondition.toUpperCase()}
                </button>
              )
            })}
          </div>
        </DropDown>
        <InputBase
          name={'determinantInput'}
          placeholder={'Введите значение'}
          value={determinant}
          handleInputChange={handleDeterminantInput}
          modificator={styles.popupInput}
        />
        {itsLastChild && (
          <Button
            modificator={buttonThemes.theme_secondary}
            onClick={handleCreate}
            data-id={id}
            data-parent-second-level-id={parentSecondLevelId}
          >
            <IconPlus />
          </Button>
        )}
      </div>
      <div className={styles.firstLevelDeleteButton}>
        <Button
          modificator={buttonThemes.theme_secondary}
          onClick={handleDelete}
          data-id={id}
          data-index={index}
          data-parent-second-level-id={parentSecondLevelId}
        >
          <IconPlus />
        </Button>
      </div>
    </div>
  )
}
export default FirstLevel
