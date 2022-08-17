export interface ITask {
  type: string
  in: string[]
  out: string[]
}

export interface ITasksHeap {
  [id: string]: ITask
}

export type TObject = {
  [key: string]: any
}
