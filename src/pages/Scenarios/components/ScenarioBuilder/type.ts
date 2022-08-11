export interface IAction {
  in: string[]
  out: string[]
}

export interface IActionHeap {
  [id: string]: IAction
}

export type TObject = {
  [key: string]: any
}
