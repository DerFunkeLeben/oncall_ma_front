export interface IActionTable extends IDefaultAction {
  url: string
}

export interface IActionRadio extends IDefaultAction {
  options: IOption[]
}

export interface IActionDropDown extends IDefaultAction {
  options: IOption[]
}

export interface IActionRelation extends IDefaultAction {
  count?: number
}

export interface IActionFilter extends IDefaultAction {
  attributes: string[]
}

export interface IDefaultAction {
  type: string
  name: string
  title?: string
  getNextStep?: (value: IStatePopup) => IStep
  require?: boolean
}

export type IAction =
  | IActionTable
  | IActionRadio
  | IDefaultAction
  | IActionRelation
  | IActionFilter
  | IActionDropDown

export interface IConfig {
  title: string
  steps: IAction[][]
}

export interface IState {
  [key: string]: string | undefined
}

export interface IStatePopup {
  [key: string]: { [key: string]: string | undefined } | undefined
}

export interface IStep {
  name: string
  type: string
  getNextStep?: (value: IStatePopup) => IStep
  title?: string
  options?: IOption[]
}

export interface IOption {
  name: string
  label: string
  type?: string
}
