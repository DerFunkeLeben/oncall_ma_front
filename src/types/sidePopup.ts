export interface IActionTable extends IDefaultAction {
  url: string
}

export interface IActionRadio extends IDefaultAction {
  options: IRadioOption[]
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
  getNextStep?: (value: IState) => IStep
  require?: boolean
}

export type IAction = IActionTable | IActionRadio | IDefaultAction | IActionRelation | IActionFilter

export interface IConfig {
  title: string
  steps: IAction[][]
}

export interface IState {
  [key: string]: string | undefined
}

export interface IStep {
  name: string
  type: string
  getNextStep?: (value: IState) => IStep
  title?: string
  options?: IRadioOption[]
}

export interface IRadioOption {
  name: string
  label: string
}
