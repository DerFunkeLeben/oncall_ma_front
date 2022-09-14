import React, { useState, Dispatch, SetStateAction } from 'react'
import { DoctorKeys } from 'constants/audience'
import { Conditions, LogicalOperators } from 'constants/sidePopup'
import { IFirstLevelObj, ISecondLevelObj, IThirdLevelObj } from './types'
import { v4 as uuid } from 'uuid'

export interface IFilterState {
  firstLevelElements: IFirstLevelObj[]
  secondLevelElements: ISecondLevelObj[]
  thirdLevelElements: IThirdLevelObj[]
  setFirstLevelElements: Dispatch<SetStateAction<IFirstLevelObj[]>>
  setSecondLevelElements: Dispatch<SetStateAction<ISecondLevelObj[]>>
  setThirdLevelElements: Dispatch<SetStateAction<IThirdLevelObj[]>>
  parseStateToQuery: () => any
  test: () => void
  parseQueryToState: (query: Query) => void
}

export default function useFilterState() {
  const [firstLevelElements, setFirstLevelElements] = useState<IFirstLevelObj[]>([
    {
      defined: DoctorKeys.specialty,
      logicalOperator: LogicalOperators.AND,
      condition: Conditions.CONTAINS,
      determinant: ' ',
      id: '11',
    },
  ])
  const [secondLevelElements, setSecondLevelElements] = useState<ISecondLevelObj[]>([
    { id: '21', logicalOperator: LogicalOperators.AND, childIds: ['11'] },
  ])
  const [thirdLevelElements, setThirdLevelElements] = useState<IThirdLevelObj[]>([
    { id: '31', logicalOperator: LogicalOperators.AND, childIds: ['21'] },
  ])

  const parseStateToQuery = () => {
    const query = {} as Query

    thirdLevelElements.map((thirdLevelItem) => {
      const thirdLevelKey = thirdLevelItem.logicalOperator
      const childIds = thirdLevelItem.childIds

      query[thirdLevelKey] = query[thirdLevelKey] || {}

      childIds.map((thirdLevelChildId) => {
        const secondLevelItem = secondLevelElements.find(
          (item) => item.id === thirdLevelChildId
        ) as ISecondLevelObj

        const secondLevelKey = secondLevelItem.logicalOperator
        const secondLevelChildIds = secondLevelItem?.childIds

        query[thirdLevelKey][secondLevelKey] = query[thirdLevelKey][secondLevelKey] || {}

        let defined: DoctorKeys | undefined = undefined

        secondLevelChildIds.map((secondLevelChildId) => {
          const firstLevelItem = firstLevelElements.find(
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
    console.log(firstLevelElements)
    console.log(secondLevelElements)
    console.log(thirdLevelElements)
    console.log(query)

    return query
  }

  const parseQueryToState = (query: Query) => {
    const thirdLevel = [] as any[]
    const secondLevel = [] as any[]
    const firstLevel = [] as any[]

    const thirdLevelKeys = Object.keys(query)
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
    console.log(thirdLevel)
    console.log(secondLevel)
    console.log(firstLevel)
    // setThirdLevelElements(thirdLevel)
    // setSecondLevelElements(secondLevel)
    // setFirstLevelElements(firstLevel)
  }

  return {
    firstLevelElements,
    setFirstLevelElements,
    secondLevelElements,
    setSecondLevelElements,
    thirdLevelElements,
    setThirdLevelElements,
    parseStateToQuery,
    parseQueryToState,
  } as IFilterState
}

type Query = { [key: string]: { [key: string]: any } }

const q = {
  and: {
    and: {
      and: [
        { field: 'specialty', type: 'contain', value: 'хир' },
        { field: 'firstName', type: 'equal', value: 'Андрей' },
      ],
      or: [{ field: 'organization', type: 'contain', value: 'ЦКБ' }],
    },
  },
}
