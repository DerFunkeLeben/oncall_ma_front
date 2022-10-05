import { DoctorKeys } from 'constants/audience'
import { IFilterState, IFirstLevelObj, ISecondLevelObj } from './types'
import { v4 as uuid } from 'uuid'
import { defaultQueryValue } from 'constants/sidePopup'

export const validateFields = (filterState: IFilterState) => {
  const emptyFields = filterState.firstLevel.filter((element: IFirstLevelObj) => !element.value)
  return !emptyFields.length
}

export const prepareFilterState = (filterState: IFilterState) => {
  const { thirdLevel, secondLevel, firstLevel } = filterState

  thirdLevel.map((thirdLevelItem) => {
    const childIds = thirdLevelItem.childIds

    childIds.map((thirdLevelChildId) => {
      const secondLevelItem = secondLevel.find(
        (item) => item.id === thirdLevelChildId
      ) as ISecondLevelObj

      const secondLevelChildIds = secondLevelItem.childIds

      let fieldName: DoctorKeys | undefined = undefined

      secondLevelChildIds.map((secondLevelChildId) => {
        const firstLevelItemIndex = firstLevel.findIndex((item) => item.id === secondLevelChildId)

        if (!fieldName) fieldName = firstLevel[firstLevelItemIndex].fieldName
        firstLevel[firstLevelItemIndex].fieldName = fieldName
      })
    })
  })

  return { thirdLevel, secondLevel, firstLevel }
}

export const parseStateToQuery = (filterState: IFilterState) => {
  const { thirdLevel, secondLevel, firstLevel } = filterState
  const query = {} as Query

  thirdLevel.map((thirdLevelItem) => {
    const thirdLevelKey = thirdLevelItem.logicalOperator
    const childIds = thirdLevelItem.childIds

    query[thirdLevelKey] = query[thirdLevelKey] || {}

    childIds.map((thirdLevelChildId) => {
      const secondLevelItem = secondLevel.find(
        (item) => item.id === thirdLevelChildId
      ) as ISecondLevelObj

      const secondLevelKey = secondLevelItem.logicalOperator
      const secondLevelChildIds = secondLevelItem?.childIds

      query[thirdLevelKey][secondLevelKey] = query[thirdLevelKey][secondLevelKey] || {}

      let fieldName: DoctorKeys | undefined = undefined
      let lastKey = 'and'
      const firstLevelElements = [] as any[]
      secondLevelChildIds.map((secondLevelChildId) => {
        const firstLevelItem = firstLevel.find(
          (item) => item.id === secondLevelChildId
        ) as IFirstLevelObj

        if (!fieldName) fieldName = firstLevelItem.fieldName

        const firstLevelKey = firstLevelItem.logicalOperator
        if (lastKey !== firstLevelKey) lastKey = firstLevelKey

        const { condition, value } = firstLevelItem

        firstLevelElements.push({
          field: fieldName,
          type: condition,
          value: value,
        })
      })

      //TODO нужно что-то менять...
      if (!query[thirdLevelKey][secondLevelKey][lastKey])
        query[thirdLevelKey][secondLevelKey][lastKey] = firstLevelElements
      else
        query[thirdLevelKey][secondLevelKey][lastKey] = [
          ...query[thirdLevelKey][secondLevelKey][lastKey],
          ...firstLevelElements,
        ]
    })
  })
  console.log(query)

  return query
}

export const parseQueryToState = (query: Query) => {
  if (!query) return {}
  const thirdLevel = [] as any[]
  const secondLevel = [] as any[]
  const firstLevel = [] as any[]

  const thirdLevelKeys = Object.keys(query)
  if (thirdLevelKeys.length === 0) return {}

  thirdLevelKeys.map((thirdLevelKey) => {
    const secondLevelKeys = Object.keys(query[thirdLevelKey])
    const thirdLevelChildIds = [] as any[]

    secondLevelKeys.map((secondLevelKey) => {
      const firstLevelKeys = Object.keys(query[thirdLevelKey][secondLevelKey])
      const secondLevelChildIds = [] as any[]

      firstLevelKeys.map((firstLevelKey) => {
        const firstLevelChildren = query[thirdLevelKey][secondLevelKey][firstLevelKey] as any[]

        firstLevelChildren.map((firstLevelChild) => {
          const firstLevelId = uuid()
          const value = firstLevelChild.value === defaultQueryValue ? '' : firstLevelChild.value

          firstLevel.push({
            fieldName: firstLevelChild.field,
            logicalOperator: firstLevelKey,
            condition: firstLevelChild.type,
            value: value,
            id: firstLevelId,
          })
          secondLevelChildIds.push(firstLevelId)
        })
      })

      const secondLevelId = uuid()
      secondLevel.push({
        id: secondLevelId,
        logicalOperator: secondLevelKey,
        childIds: secondLevelChildIds,
      })
      thirdLevelChildIds.push(secondLevelId)
    })

    const thirdLevelId = uuid()
    thirdLevel.push({
      id: thirdLevelId,
      logicalOperator: thirdLevelKey,
      childIds: thirdLevelChildIds,
    })
  })
  return {
    filter: { firstLevel, secondLevel, thirdLevel, validationError: false },
  }
}

type Query = { [key: string]: { [key: string]: any } }
