import { FC, useRef } from 'react'
import cx from 'classnames'

import Button from 'components/parts/Button/Button'
import DropDown from 'components/parts/DropDown/DropDown'

import { IFirstLevel } from './types'

import styles from './FilterAction.module.scss'
import buttonThemes from 'components/parts/Button/ButtonThemes.module.scss'
import dropDownStyles from 'components/parts/DropDown/DropDown.module.scss'
import inputThemes from 'components/parts/InputBase/InputBaseThemes.module.scss'

import { PositiveLogicalOperators, Conditions } from 'constants/sidePopup'

import { IconPlus } from '../../../../assets/icons'
import InputBase from 'components/parts/InputBase/InputBase'
import { Align } from 'constants/dictionary'

const FirstLevel: FC<IFirstLevel> = ({
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
  //*TODO переписать все функции */
  const handleCreate = (e: any) => {
    const secondLevelId = e.currentTarget.dataset.parentSecondLevelId
    handleCreateFirstLevel(secondLevelId)
  }
  const handleDelete = (e: any) => {
    const secondLevelId = e.currentTarget.dataset.parentSecondLevelId
    const firstLevelId = e.currentTarget.dataset.id
    const itsFirstChildren = e.currentTarget.dataset.itsFirstChild
    handleDeleteFirstLevelRow(firstLevelId, secondLevelId, itsFirstChildren)
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
  const calibrationText = () => {
    if (!determinant) return 'Введите значение'
    if (determinant.length > 20) return determinant.slice(-20)
    return determinant
  }
  return (
    <div className={cx(styles.firstLevelOperand)}>
      <div className={styles.firstLevelOperandContent}>
        <div className={cx(styles.leftGap)}>
          {itsFirstChild && <p className={cx(styles.filterElement, 'text_1')}>у которых</p>}
        </div>
        {itsFirstChild ? (
          <DropDown
            align={Align.LEFT}
            triggerNode={
              <Button modificator={buttonThemes.theme_filter_accent}>
                {defined.toLowerCase()}
              </Button>
            }
          >
            <div className={dropDownStyles.container}>
              {headers.map((headerElement) => {
                return (
                  <button
                    key={headerElement}
                    className={cx(dropDownStyles.element, 'text_1')}
                    onClick={handleChangeDefined}
                    data-defined={headerElement}
                  >
                    {headerElement.toLowerCase()}
                  </button>
                )
              })}
            </div>
          </DropDown>
        ) : (
          <DropDown
            align={Align.LEFT}
            triggerNode={
              <Button modificator={buttonThemes.theme_filter_accent}>
                {logicalOperator.toLowerCase()}
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
                    {operator.toLowerCase()}
                  </button>
                )
              })}
            </div>
          </DropDown>
        )}
        <DropDown
          align={Align.LEFT}
          triggerNode={
            <Button modificator={buttonThemes.theme_filter}>{condition.toLowerCase()}</Button>
          }
        >
          <div className={dropDownStyles.container}>
            {Object.values(Conditions).map((currentCondition) => {
              return (
                <button
                  key={currentCondition}
                  className={cx(dropDownStyles.element, 'text_1')}
                  onClick={handleChangeCondition}
                  data-condition={currentCondition}
                >
                  {currentCondition.toLowerCase()}
                </button>
              )
            })}
          </div>
        </DropDown>
        <div className={styles.inputContainer}>
          <span className={cx(styles.sizeCalibrator, 'text_1')}>{calibrationText()}</span>
          <InputBase
            name={'determinantInput'}
            placeholder={'Введите значение'}
            value={determinant}
            handleInputChange={handleDeterminantInput}
            modificator={cx(inputThemes.theme_simple, styles.input)}
            wrapperModificator={inputThemes.theme_simple_wrapper}
          />
        </div>
        {itsLastChild && (
          <Button
            modificator={buttonThemes.theme_additional}
            onClick={handleCreate}
            data-id={id}
            data-parent-second-level-id={parentSecondLevelId}
          >
            <IconPlus className={styles.iconCreate} />
          </Button>
        )}
      </div>
      <div className={styles.firstLevelDeleteButton}>
        <Button
          modificator={buttonThemes.theme_additional}
          onClick={handleDelete}
          data-id={id}
          data-its-first-child={itsFirstChild}
          data-parent-second-level-id={parentSecondLevelId}
        >
          <IconPlus className={styles.iconDelete} />
        </Button>
      </div>
    </div>
  )
}
export default FirstLevel
