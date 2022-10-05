import { FC, ChangeEvent, useState } from 'react'
import cx from 'classnames'
import { v4 as uuid } from 'uuid'

import usePopupContext from 'context/SidePopupContext'
import InputBase from 'components/parts/InputBase/InputBase'
import styles from '../SidePopup.module.scss'
import actionStyles from './styles.module.scss'
import { IAction } from 'types/sidePopup'
import { useSidePopup } from 'store/sidePopupStore/useSidePopup'
import FilterAction from './FilterAction/FilterAction'
import { SidePopupActions } from 'constants/sidePopup'
import SidePopupFooter from '../SidePopupFooter'
import { IconFilters } from 'assets/icons'
import { LogicalOperators, Conditions } from 'constants/sidePopup'

const AttibuteConditionAction: FC<IAction> = ({
  settingName,
  label,
  applySettings,
  attributes,
}) => {
  const { step, currentState, tempSettings, setSettings } = usePopupContext()
  const { updateTempSettings } = useSidePopup()
  const [filterPopupIsOpen, setFilterPopupIsOpen] = useState(false)

  const openFilterPopup = () => {
    setFilterPopupIsOpen(true)
  }

  const closeFilterPopup = () => {
    setFilterPopupIsOpen(false)
    initState()
  }

  const save = () => {
    setFilterPopupIsOpen(false)
  }

  // const attributes = ['a']

  const initState = () => {
    const initFirstLevelRow = (id: string) => {
      return {
        fieldName: attributes?.[0].toLocaleLowerCase(),
        logicalOperator: LogicalOperators.AND,
        condition: Conditions.EQUAL,
        value: '',
        id: id,
      }
    }
    const initSecondLevelRow = (id: string, childId: string) => {
      return {
        id: id,
        logicalOperator: LogicalOperators.AND,
        childIds: [childId],
      }
    }
    const initThirdLevelRow = (id: string, childId: string, operator: string) => {
      return {
        id: id,
        logicalOperator: operator,
        childIds: [childId],
      }
    }
    const newThirdLevelId = uuid()
    const newFirstLevelId = uuid()
    const newSecondLevelId = uuid()
    const newFirstLevelElements = [initFirstLevelRow(newFirstLevelId)]
    const newSecondLevelElements = [initSecondLevelRow(newSecondLevelId, newFirstLevelId)]
    const newThirdLevelElements = [
      initThirdLevelRow(newThirdLevelId, newSecondLevelId, LogicalOperators.AND),
    ]
    const newlevel = {
      firstLevel: newFirstLevelElements,
      secondLevel: newSecondLevelElements,
      thirdLevel: newThirdLevelElements,
    }
    applySettings(newlevel, tempSettings, updateTempSettings)
  }

  return (
    <>
      <div className={actionStyles.attibuteConditionWrapper}>
        <div className={actionStyles.branch} onClick={openFilterPopup}>
          <p className={cx(actionStyles.branchName, 'header_2')}>Ветка 1</p>
          <div className={actionStyles.chooseFilterButton}>
            <p className="text_1">Настроить ветку</p>
            <IconFilters />
          </div>
        </div>
        <div className={cx(actionStyles.branch, actionStyles.other)}>
          <p className={cx(actionStyles.branchName, 'header_2')}>Остальные</p>
          <div className={actionStyles.chooseFilterButton}>
            <p className={cx('text_1', actionStyles.otherPlaceholder)}>Не вошедшие в фильтр</p>
          </div>
        </div>
      </div>
      {filterPopupIsOpen && (
        <div className={actionStyles.filterPopup}>
          <FilterAction
            settingName={settingName}
            applySettings={applySettings}
            type={SidePopupActions.FILTER}
            attributes={attributes}
          />
          <SidePopupFooter
            stepNumber={1}
            countOfSteps={1}
            closePopup={closeFilterPopup}
            goToPrevStep={closeFilterPopup}
            save={save}
            goToNextStep={closeFilterPopup}
            counterEnabled={true}
          />
        </div>
      )}
    </>
  )
}

export default AttibuteConditionAction
