export interface IStepTable extends IStep {
  url: string
}

export interface IStepRadio extends IStep {
  options: IOption[]
}

export interface IStepDropDown extends IStep {
  options: IOption[]
}

export interface IStepRelation extends IStep {
  count?: number
}

export interface IStepFilter extends IStep {
  attributes: string[]
}

export type ISidePopupStep =
  | IStepTable
  | IStepRadio
  | IStep
  | IStepRelation
  | IStepFilter
  | IStepDropDown

export interface IConfig {
  title: string
  steps: ISidePopupStep[][]
}

export interface IState {
  [key: string]: string | undefined
}

export interface IStatePopup {
  [key: string]: { [key: string]: string | undefined } | undefined
}

export interface IAction {
  settingName: string
  options?: IOption[]
  type: string
  label?: string
  applySettings: (newState: any, tempSettings: any, updateTempSettings: any) => any
  url?: string
  attributes?: string[]
}

export interface IStep {
  name: string
  getNextStep?: (value: IStatePopup, a: any) => IStep | null | undefined
  title?: string
  actions: IAction[]
}

export interface IOption {
  name: string
  label: string
  type?: string
}
