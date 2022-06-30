export interface IActionTable extends IDefaultAction {
  url: string
}

export interface IDefaultAction {
  type: string
  name: string
  require: boolean
}

export type IAction = IActionTable | IDefaultAction

export interface IConfig {
  title: string
  steps: IAction[][]
}

export interface IStateElement {
  [key: string]: string | undefined
}

export interface IState {
  [key: number]: IStateElement
}
