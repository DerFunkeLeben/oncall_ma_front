import { Dispatch, SetStateAction } from 'react'
import { IStepFilter, IState } from 'types/sidePopup'
export interface IFilterAction {
  currentState: IState
  action: IStepFilter
  setState: Dispatch<SetStateAction<IState>> /* TODO хуйня какая то */
}

export interface IFirstLevelObj {
  id: string
  defined: string
  condition: string
  determinant: string
  type: string
  logicalOperator: string
}

export interface ISecondLevelObj {
  id: string
  type: string
  logicalOperator: string
  childIds: any[]
}

export interface IThirdLevelObj {
  id: string
  type: string
  logicalOperator: string
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
}

export interface ISecondLevel extends ILevel {
  secondLevel: ISecondLevelObj
  itsFirstChild: boolean
  handleCreateFirstLevel: (e: any) => void
  handleDeleteFirstLevelRow: (id: string, parentId: string, itsFirstChildren: boolean) => void
  firstLevelElements: any[]
  updateElement: (id: string, level: string, update: { [key: string]: string }) => void
  headers: string[]
}

export interface IThirdLevel extends ILevel {
  thirdLevel: IThirdLevelObj
  handleCreateFirstLevel: (e: any) => void
  handleCreateSecondLevel: (e: any) => void
  handleDeleteFirstLevelRow: (id: string, parentId: string, itsFirstChildren: boolean) => void
  secondLevelElements: any[]
  firstLevelElements: any[]
  updateElement: (id: string, level: string, update: { [key: string]: string }) => void
  headers: string[]
}
