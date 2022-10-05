import { DoctorKeys } from 'constants/audience'
import { Conditions, PositiveLogicalOperators } from 'constants/sidePopup'
import { Dispatch, SetStateAction } from 'react'
import { ILogicalOperator } from 'types/audience'
import { IStepFilter, IState } from 'types/sidePopup'
export interface IFilterAction {
  currentState: IState
  action: IStepFilter
  setState: Dispatch<SetStateAction<IState>> /* TODO хуйня какая то */
}

export interface IFirstLevelObj {
  id: string
  fieldName: DoctorKeys
  condition: Conditions
  value: string
  type?: string
  logicalOperator: PositiveLogicalOperators
}

export interface ISecondLevelObj {
  id: string
  type?: string
  logicalOperator: ILogicalOperator
  childIds: any[]
}

export interface IThirdLevelObj {
  id: string
  type?: string
  logicalOperator: ILogicalOperator
  childIds: any[]
}

export type IConfig = IThirdLevelObj[]

export interface ILevel {
  index: number
}

export interface IFirstLevel extends ILevel {
  row: IFirstLevelObj
  itsLastChild: boolean
  itsFirstChild: boolean
  parentSecondLevelId: string
  handleCreateFirstLevel: (e: any) => void
  handleDeleteFirstLevelRow: (id: string, parentId: string, itsFirstChildren: boolean) => void
  updateElement: (id: string, level: string, update: { [key: string]: string }) => void
  headers: string[]
  firstLevelCount: number
}

export interface ISecondLevel extends ILevel {
  secondLevel: ISecondLevelObj
  itsFirstChild: boolean
  handleCreateFirstLevel: (e: any) => void
  handleDeleteFirstLevelRow: (id: string, parentId: string, itsFirstChildren: boolean) => void
  firstLevelElements: any[]
  updateElement: (id: string, level: string, update: { [key: string]: string }) => void
  headers: string[]
  firstLevelCount: number
}

export interface IThirdLevel extends ILevel {
  thirdLevel: IThirdLevelObj
  handleCreateFirstLevel: (e: any) => void
  handleCreateSecondLevel: (e: any) => void
  handleDeleteFirstLevelRow: (id: string, parentId: string, itsFirstChildren: boolean) => void
  secondLevelElements: any[]
  firstLevelElements: any[]
  firstLevelCount: number
  updateElement: (id: string, level: string, update: { [key: string]: string }) => void
  headers: string[]
}

export interface IFilterState {
  firstLevel: IFirstLevelObj[]
  secondLevel: ISecondLevelObj[]
  thirdLevel: IThirdLevelObj[]
}
