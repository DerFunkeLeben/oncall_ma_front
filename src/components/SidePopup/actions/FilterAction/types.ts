import { Dispatch, SetStateAction } from 'react'
import { IActionFilter, IState } from 'types/sidePopup'
export interface IFilterAction {
  currentState: IState
  action: IActionFilter
  setState: Dispatch<SetStateAction<IState>> /* TODO хуйня какая то */
}

export interface IFirstLevelObj {
  id: string
  defined: string
  condition: string
  determinant: string
}

export interface ISecondLevelObj {
  id: string
  type: string
  rows: IFirstLevelObj[]
}

export interface IThirdLevelObj {
  id: string
  type: string
  rows: ISecondLevelObj[]
}

export type IConfig = IThirdLevelObj[]

export interface ILevel {
  index: number
}

export interface IFirstLevel extends ILevel {
  row: IFirstLevelObj
  itsLastRow: boolean
  handleCreateFirstLevelRow: (e: any) => void
  handleDeleteFirstLevelRow: (e: any) => void
}

export interface ISecondLevel extends ILevel {
  secondLevel: ISecondLevelObj
  handleCreateFirstLevelRow: (e: any) => void
  handleDeleteFirstLevelRow: (e: any) => void
}

export interface IThirdLevel extends ILevel {
  thirdLevel: IThirdLevelObj
  handleCreateFirstLevelRow: (e: any) => void
  handleAddSecondLevel: (e: any) => void
  handleDeleteFirstLevelRow: (e: any) => void
}
