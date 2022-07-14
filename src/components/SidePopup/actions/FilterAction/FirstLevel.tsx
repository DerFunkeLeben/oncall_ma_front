import { FC } from 'react'
import cx from 'classnames'

import Button from 'components/parts/Button/Button'

import { IFirstLevel } from './types'
import styles from './FilterAction.module.scss'
import buttonThemes from 'components/parts/Button/ButtonThemes.module.scss'

import { IconPlus } from '../../../../assets/icons'

const FirstLevel: FC<IFirstLevel> = ({
  index,
  row,
  itsLastChild,
  itsFirstChild,
  handleCreateFirstLevel,
  handleDeleteFirstLevelRow,
  parentSecondLevelId,
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
  return (
    <div className={cx(styles.firstLevelOperand)}>
      <div className={styles.firstLevelOperandContent}>
        <div className={cx(styles.filterElement, styles.leftGap)}>
          {itsFirstChild && <p>у которых</p>}
        </div>
        {itsFirstChild ? (
          <p className={styles.filterElement}>{defined}</p>
        ) : (
          <p className={styles.filterElement}>{logicalOperator}</p>
        )}
        <p className={styles.filterElement}>{condition}</p>
        <p className={styles.filterElement}>{determinant}</p>
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
