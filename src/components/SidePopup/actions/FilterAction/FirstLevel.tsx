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
  itsLastRow,
  handleCreateFirstLevelRow,
  handleDeleteFirstLevelRow,
}) => {
  const { defined, condition, determinant, id } = row
  return (
    <div className={cx(styles.firstLevelOperand)}>
      <div className={styles.firstLevelOperandContent}>
        <div className={cx(styles.filterElement, styles.leftGap)}>
          {index === 0 && <p>у которых</p>}
        </div>
        <p className={styles.filterElement}>{defined}</p>
        <p className={styles.filterElement}>{condition}</p>
        <p className={styles.filterElement}>{determinant}</p>
        {itsLastRow && (
          <Button
            modificator={buttonThemes.theme_secondary}
            onClick={handleCreateFirstLevelRow}
            data-id={id}
          >
            <IconPlus />
          </Button>
        )}
      </div>
      <div className={styles.firstLevelDeleteButton}>
        <Button
          modificator={buttonThemes.theme_secondary}
          onClick={handleDeleteFirstLevelRow}
          data-id={id}
          data-index={index}
        >
          <IconPlus />
        </Button>
      </div>
    </div>
  )
}
export default FirstLevel
