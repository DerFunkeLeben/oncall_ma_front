import { FC, Dispatch, SetStateAction, useState, useRef, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import cx from 'classnames'

import Button from 'components/parts/Button/Button'
import ThirdLevel from './ThirdLevel'

import styles from './FilterAction.module.scss'
import buttonThemes from 'components/parts/Button/ButtonThemes.module.scss'
import { IconPlus } from '../../../../assets/icons'

import { IFilterAction, IFirstLevelObj, ISecondLevelObj, IThirdLevelObj, IConfig } from './types'

const FilterAction: FC<IFilterAction> = ({ action, currentState, setState }) => {
  const actionName = action.name
  const attributes = action.attributes
  const title = action.title

  const logicalOperators = ['и', 'не и', 'или', 'не или']

  console.log(attributes)

  const initFirstLevelRow = (id: string) => {
    return {
      defined: attributes[0].toLocaleLowerCase(),
      logicalOperator: logicalOperators[0],
      condition: 'содержит',
      determinant: 'Введите значение',
      id: id,
    }
  }

  const initSecondLevelRow = (id: string, childId: string) => {
    return {
      id: id,
      logicalOperator: logicalOperators[0],
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

  const [firstLevelElements, setFirstLevelElements] = useState<any[]>([
    {
      defined: attributes[0].toLocaleLowerCase(),
      logicalOperator: logicalOperators[0],
      condition: 'содержит',
      determinant: 'Введите значение',
      id: '11',
    },
  ])
  const [secondLevelElements, setSecondLevelElements] = useState<any[]>([
    { id: '21', logicalOperator: logicalOperators[0], childIds: ['11'] },
  ])
  const [thirdLevelElements, setThirdLevelElements] = useState<any[]>([
    { id: '31', logicalOperator: logicalOperators[0], childIds: ['21'] },
  ])

  const handleCreateFirstLevel = (secondLevelId: string) => {
    const newFirstLevelId = uuid()
    const newSecondLevelElements = secondLevelElements.map((element) => {
      if (element.id !== secondLevelId) return element
      else {
        return {
          ...element,
          childIds: [...element.childIds, newFirstLevelId],
        }
      }
    })
    const newFirstLevelElements = [...firstLevelElements, initFirstLevelRow(newFirstLevelId)]
    setSecondLevelElements(newSecondLevelElements)
    setFirstLevelElements(newFirstLevelElements)
  }

  const handleCreateSecondLevel = (thirdLevelId: string) => {
    const newFirstLevelId = uuid()
    const newSecondLevelId = uuid()
    const newFirstLevelElements = [...firstLevelElements, initFirstLevelRow(newFirstLevelId)]
    const newSecondLevelElements = [
      ...secondLevelElements,
      initSecondLevelRow(newSecondLevelId, newFirstLevelId),
    ]
    const newThirdLevelElements = thirdLevelElements.map((element) => {
      console.log(element.id, thirdLevelId)
      if (element.id !== thirdLevelId) return element
      else {
        return {
          ...element,
          childIds: [...element.childIds, newSecondLevelId],
        }
      }
    })
    setThirdLevelElements(newThirdLevelElements)
    setSecondLevelElements(newSecondLevelElements)
    setFirstLevelElements(newFirstLevelElements)
  }

  const handleCreateThirdLevel = (e: any) => {
    const { operator } = e.currentTarget.dataset
    const newThirdLevelId = uuid()
    const newFirstLevelId = uuid()
    const newSecondLevelId = uuid()
    const newFirstLevelElements = [...firstLevelElements, initFirstLevelRow(newFirstLevelId)]
    const newSecondLevelElements = [
      ...secondLevelElements,
      initSecondLevelRow(newSecondLevelId, newFirstLevelId),
    ]
    const newThirdLevelElements = [
      ...thirdLevelElements,
      initThirdLevelRow(newThirdLevelId, newSecondLevelId, operator),
    ]
    setThirdLevelElements(newThirdLevelElements)
    setSecondLevelElements(newSecondLevelElements)
    setFirstLevelElements(newFirstLevelElements)
  }

  const handleDeleteFirstLevelRow = (id: string, parentId: string) => {
    const newFirstLevelElements = firstLevelElements.filter(
      (firstLevelElement) => firstLevelElement.id !== id
    )
    const newSecondLevelElements = secondLevelElements
      .map((secondLevelElement) => {
        if (secondLevelElement.id === parentId) {
          const childsArrayWithoutTarget = secondLevelElement.childIds.filter(
            (childId: any) => childId !== id
          )
          if (childsArrayWithoutTarget.length === 0) {
            const newThirdLevelElements = thirdLevelElements
              .map((thirdElement) => {
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
              .filter((element) => element)
            setThirdLevelElements(newThirdLevelElements)
            return null
          } else {
            return {
              ...secondLevelElement,
              childIds: childsArrayWithoutTarget,
            }
          }
        } else return secondLevelElement
      })
      .filter((element) => element)
    setFirstLevelElements(newFirstLevelElements)
    setSecondLevelElements(newSecondLevelElements)
  }

  const updateElement = (id: string, level: string, update: { [key: string]: string }) => {
    console.log(id, level, update)
    if (level === 'first') {
      const updatedFirst = firstLevelElements.map((element) => {
        if (element.id === id) {
          return {
            ...element,
            ...update,
          }
        } else return element
      })
      setFirstLevelElements(updatedFirst)
    } else if (level === 'second') {
      console.log('second')
    } else if (level === 'third') {
      const updatedThird = thirdLevelElements.map((element) => {
        if (element.id === id) {
          console.log({
            ...element,
            ...update,
          })
          return {
            ...element,
            ...update,
          }
        } else return element
      })
      console.log(updatedThird)
      setThirdLevelElements(updatedThird)
    }
  }

  useEffect(() => {
    console.log({ firstLevelElements })
    console.log({ secondLevelElements })
    console.log({ thirdLevelElements })
  }, [firstLevelElements, secondLevelElements, thirdLevelElements])

  return (
    <div className={styles.wrapper}>
      <div className={styles.filterContainer}>
        {thirdLevelElements.map((thirdLevelElement, thirdLevelIndex) => {
          return (
            <ThirdLevel
              index={thirdLevelIndex}
              key={thirdLevelIndex}
              thirdLevel={thirdLevelElement}
              secondLevelElements={secondLevelElements}
              firstLevelElements={firstLevelElements}
              handleCreateFirstLevel={handleCreateFirstLevel}
              handleCreateSecondLevel={handleCreateSecondLevel}
              handleDeleteFirstLevelRow={handleDeleteFirstLevelRow}
              updateElement={updateElement}
            />
          )
        })}
      </div>
      <div className={styles.controlContainer}>
        {logicalOperators.map((operator) => {
          return (
            <Button
              key={operator}
              modificator={buttonThemes.theme_secondary}
              onClick={handleCreateThirdLevel}
              data-operator={operator}
            >
              {operator.toLocaleUpperCase()}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

export default FilterAction
