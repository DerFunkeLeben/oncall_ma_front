import { DoctorKeys } from 'constants/audience'
import { IFilterState, IFirstLevelObj, ISecondLevelObj } from './types'
import { v4 as uuid } from 'uuid'

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

      let defined: DoctorKeys | undefined = undefined

      secondLevelChildIds.map((secondLevelChildId) => {
        const firstLevelItem = firstLevel.find(
          (item) => item.id === secondLevelChildId
        ) as IFirstLevelObj

        if (!defined) defined = firstLevelItem.defined

        const firstLevelKey = firstLevelItem.logicalOperator

        if (!query[thirdLevelKey][secondLevelKey][firstLevelKey])
          query[thirdLevelKey][secondLevelKey][firstLevelKey] = []

        const { condition, determinant } = firstLevelItem
        query[thirdLevelKey][secondLevelKey][firstLevelKey].push({
          field: defined,
          type: condition,
          value: determinant,
        })
      })
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
          firstLevel.push({
            defined: firstLevelChild.field,
            logicalOperator: firstLevelKey,
            condition: firstLevelChild.type,
            determinant: firstLevelChild.value,
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
    filter: { firstLevel, secondLevel, thirdLevel },
  }
}

type Query = { [key: string]: { [key: string]: any } }

const q = {
  and: {
    and: {
      and: [
        {
          field: 'city',
          type: 'contain',
          value: 'Москва',
        },
      ],
    },
  },
}
