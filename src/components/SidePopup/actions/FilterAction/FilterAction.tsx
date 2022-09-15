import { FC, Dispatch, SetStateAction, useState, useRef, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import cx from 'classnames'

import usePopupContext from 'context/SidePopupContext'

import Button from 'components/parts/Button/Button'
import ThirdLevel from './ThirdLevel'

import styles from './FilterAction.module.scss'
import buttonThemes from 'components/parts/Button/ButtonThemes.module.scss'
import { IconPlus } from '../../../../assets/icons'

import { IFilterAction, IFirstLevelObj, ISecondLevelObj, IThirdLevelObj, IConfig } from './types'

import { LogicalOperators, Conditions, LogicLabels } from 'constants/sidePopup'
import ScrollArea from 'containers/ScrollArea/ScrollArea'
import { IFilterState } from './useFilterState'
import { ILogicalOperator } from 'types/audience'
import { DoctorKeys } from 'constants/audience'

import { IAction } from 'types/sidePopup'
import { useSidePopup } from 'store/sidePopupStore/useSidePopup'
interface IRadioGroupAction extends IAction {
  attributes: any
}

const FilterAction: FC<IRadioGroupAction> = ({ settingName, applySettings, attributes }) => {
  const { step, tempSettings } = usePopupContext()
  const { updateTempSettings } = useSidePopup()
  const actionName = step.name

  const initFirstLevelRow = (id: string) => {
    return {
      defined: DoctorKeys.specialty,
      logicalOperator: LogicalOperators.AND,
      condition: Conditions.CONTAINS,
      determinant: '',
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
  const initThirdLevelRow = (id: string, childId: string, operator: ILogicalOperator) => {
    return {
      id: id,
      logicalOperator: operator,
      childIds: [childId],
    }
  }

  const initState = () => {
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

  useEffect(() => {
    if (!tempSettings?.[actionName]?.[settingName]) {
      initState()
    }
  }, [])

  const filterState =
    tempSettings && tempSettings[actionName] && tempSettings[actionName][settingName]
      ? tempSettings[actionName][settingName]
      : ''

  const { firstLevel, secondLevel, thirdLevel } = filterState

  const updateState = (newlevel: any) => {
    applySettings(newlevel, tempSettings, updateTempSettings)
  }

  //*TODO переписать все функции */

  const handleCreateFirstLevel = (secondLevelId: string) => {
    const newFirstLevelId = uuid()
    const newSecondLevelElements = secondLevel.map((element: any) => {
      if (element.id !== secondLevelId) return element
      else {
        return {
          ...element,
          childIds: [...element.childIds, newFirstLevelId],
        }
      }
    })
    const newFirstLevelElements = [...firstLevel, initFirstLevelRow(newFirstLevelId)]
    updateState({ firstLevel: newFirstLevelElements, secondLevel: newSecondLevelElements })
  }

  const handleCreateSecondLevel = (thirdLevelId: string) => {
    const newFirstLevelId = uuid()
    const newSecondLevelId = uuid()
    const newFirstLevelElements = [...firstLevel, initFirstLevelRow(newFirstLevelId)]
    const newSecondLevelElements = [
      ...secondLevel,
      initSecondLevelRow(newSecondLevelId, newFirstLevelId),
    ]
    const newThirdLevelElements = thirdLevel.map((element: any) => {
      console.log(element.id, thirdLevelId)
      if (element.id !== thirdLevelId) return element
      else {
        return {
          ...element,
          childIds: [...element.childIds, newSecondLevelId],
        }
      }
    })
    updateState({
      firstLevel: newFirstLevelElements,
      secondLevel: newSecondLevelElements,
      thirdLevel: newThirdLevelElements,
    })
  }

  const handleCreateThirdLevel = (e: any) => {
    const { operator } = e.currentTarget.dataset
    const newThirdLevelId = uuid()
    const newFirstLevelId = uuid()
    const newSecondLevelId = uuid()
    const newFirstLevelElements = [...firstLevel, initFirstLevelRow(newFirstLevelId)]
    const newSecondLevelElements = [
      ...secondLevel,
      initSecondLevelRow(newSecondLevelId, newFirstLevelId),
    ]
    const newThirdLevelElements = [
      ...thirdLevel,
      initThirdLevelRow(newThirdLevelId, newSecondLevelId, operator),
    ]
    updateState({
      firstLevel: newFirstLevelElements,
      secondLevel: newSecondLevelElements,
      thirdLevel: newThirdLevelElements,
    })
  }

  const handleDeleteFirstLevelRow = (id: string, parentId: string, itsFirstChildren: boolean) => {
    const newFirstLevelElements = firstLevel.filter((firstLevelElement: any) => {
      return firstLevelElement.id !== id
    })
    const newSecondLevelElements = secondLevel
      .map((secondLevelElement: any) => {
        if (secondLevelElement.id === parentId) {
          const childsArrayWithoutTarget = secondLevelElement.childIds.filter(
            (childId: any) => childId !== id
          )
          if (childsArrayWithoutTarget.length === 0) {
            const newThirdLevelElements = thirdLevel
              .map((thirdElement: any) => {
                if (thirdElement.childIds.includes(parentId)) {
                  const childsArrayWithoutSecond = thirdElement.childIds.filter(
                    (childId: any) => childId !== parentId
                  )
                  if (childsArrayWithoutSecond.length === 0) return null
                  else {
                    return {
                      ...thirdElement,
                      childIds: childsArrayWithoutSecond,
                    }
                  }
                } else return thirdElement
              })
              .filter((element: any) => element) as IThirdLevelObj[]
            updateState({ firstLevel: newThirdLevelElements })
            return null
          } else {
            return {
              ...secondLevelElement,
              childIds: childsArrayWithoutTarget,
            }
          }
        } else return secondLevelElement
      })
      .filter((element: any) => element) as ISecondLevelObj[]
    updateState({ firstLevel: newFirstLevelElements, secondLevel: newSecondLevelElements })
  }

  const updateElement = (id: string, level: string, update: { [key: string]: string }) => {
    if (level === 'first') {
      const updatedFirst = firstLevel.map((element: any) => {
        if (element.id === id) {
          console.log('!s', update)
          return {
            ...element,
            ...update,
          }
        } else return element
      })
      updateState({ firstLevel: updatedFirst })
    } else if (level === 'second') {
      const updatedSecond = secondLevel.map((element: any) => {
        if (element.id === id) {
          return {
            ...element,
            ...update,
          }
        } else return element
      })
      updateState({ firstLevel: updatedSecond })
    } else if (level === 'third') {
      const updatedThird = thirdLevel.map((element: any) => {
        if (element.id === id) {
          return {
            ...element,
            ...update,
          }
        } else return element
      })
      updateState({ firstLevel: updatedThird })
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.filterContainerWrapper}>
        <div className={styles.verticalLine} />
        <ScrollArea>
          <div className={styles.filterContainer}>
            {thirdLevel &&
              thirdLevel.map((thirdLevelElement: any, thirdLevelIndex: any) => {
                return (
                  <ThirdLevel
                    index={thirdLevelIndex}
                    key={thirdLevelIndex}
                    thirdLevel={thirdLevelElement}
                    secondLevelElements={secondLevel}
                    firstLevelElements={firstLevel}
                    handleCreateFirstLevel={handleCreateFirstLevel}
                    handleCreateSecondLevel={handleCreateSecondLevel}
                    handleDeleteFirstLevelRow={handleDeleteFirstLevelRow}
                    updateElement={updateElement}
                    headers={attributes}
                  />
                )
              })}
          </div>
        </ScrollArea>
      </div>
      <div className={styles.controlContainer}>
        {Object.values(LogicalOperators).map((operator) => {
          return (
            <Button
              key={operator}
              modificator={buttonThemes.theme_secondary_accent}
              onClick={handleCreateThirdLevel}
              data-operator={operator}
            >
              {LogicLabels[operator].toLocaleUpperCase()}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

export default FilterAction
