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
