import { DoctorKeys } from 'constants/audience'
import { Conditions, LogicalOperators } from 'constants/sidePopup'
import React, { useState, Dispatch, SetStateAction } from 'react'
import { AudienceFullQuery, AudienceQuery, ILogicalOperator } from 'types/audience'
import { IFirstLevelObj, ISecondLevelObj, IThirdLevelObj } from './types'

export interface IFilterState {
  firstLevelElements: IFirstLevelObj[]
  secondLevelElements: ISecondLevelObj[]
  thirdLevelElements: IThirdLevelObj[]
  setFirstLevelElements: Dispatch<SetStateAction<IFirstLevelObj[]>>
  setSecondLevelElements: Dispatch<SetStateAction<ISecondLevelObj[]>>
  setThirdLevelElements: Dispatch<SetStateAction<IThirdLevelObj[]>>
  parseStateToQuery: () => void
}

export default function useFilterState() {
  const [firstLevelElements, setFirstLevelElements] = useState<IFirstLevelObj[]>([
    {
      defined: DoctorKeys.lastName,
      logicalOperator: LogicalOperators.AND,
      condition: Conditions.EQUAL,
      determinant: '',
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

        if (!query[thirdLevelKey][secondLevelKey]) query[thirdLevelKey][secondLevelKey] = []

        secondLevelChildIds?.map((secondLevelChildId) => {
          const firstLevelItem = firstLevelElements.find(
            (item) => item.id === secondLevelChildId
          ) as IFirstLevelObj
          const { condition, defined, determinant } = firstLevelItem
          query[thirdLevelKey][secondLevelKey].push({
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
  }

  return {
    firstLevelElements,
    setFirstLevelElements,
    secondLevelElements,
    setSecondLevelElements,
    thirdLevelElements,
    setThirdLevelElements,
    parseStateToQuery,
  } as IFilterState
}

type Query = { [key: string]: { [key: string]: any[] } }

const q = {
  and: {
    and: [
      { field: 'specialty', type: 'contain', value: 'хир' },
      { field: 'firstName', type: 'equal', value: 'Андрей' },
    ],
    or: [{ field: 'organization', type: 'contain', value: 'ЦКБ' }],
  },
}
