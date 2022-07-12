import { FC, Dispatch, SetStateAction } from 'react'

import RadioGroup from 'components/parts/RadioGroup/RadioGroup'

import { IActionFilter, IStatePopup } from 'types/sidePopup'
import DropDown from 'components/parts/DropDown/DropDown'
import Button from 'components/parts/Button/Button'

import styles from './FilterAction.module.scss'
import buttonThemes from 'components/parts/Button/ButtonThemes.module.scss'

interface IFilterAction {
  currentState: IStatePopup
  action: IActionFilter
  setState: Dispatch<SetStateAction<IStatePopup>> /* TODO хуйня какая то */
}

const FilterAction: FC<IFilterAction> = ({ action, currentState, setState }) => {
  const actionName = action.name
  const title = action.title

  return (
    <div className={styles.wrapper}>
      <div className={styles.filterContainer}>
        <div className={styles.thirdLevelFilter}>
          <div>
            <p>Врачи</p>
          </div>
          <div className={styles.firstLevelFilter}>
            <div className={styles.firstLevelOperand}>
              <p>у которых</p>
              <p>специальность</p>
              <p>содержит</p>
              <p>Урология</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.controlContainer}>
        <Button modificator={buttonThemes.theme_secondary}>И</Button>
        <Button modificator={buttonThemes.theme_secondary}>ИЛИ</Button>
        <Button modificator={buttonThemes.theme_secondary}>НЕ И</Button>
        <Button modificator={buttonThemes.theme_secondary}>НЕ ИЛИ</Button>
      </div>
    </div>
  )
}

export default FilterAction
