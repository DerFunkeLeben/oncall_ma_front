export interface IActionTable extends IDefaultAction {
  url: string
}

export interface IActionRadio extends IDefaultAction {
  options: IRadioOption[]
}

export interface IActionRelation extends IDefaultAction {
  count?: number
}

export interface IDefaultAction {
  type: string
  name: string
  title?: string
  require: boolean
}

export type IAction = IActionTable | IActionRadio | IDefaultAction | IActionRelation

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
