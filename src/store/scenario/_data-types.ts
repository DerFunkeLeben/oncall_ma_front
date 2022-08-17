export enum StoreKeys {
  taskIsMoving = 'taskIsMoving',
  tasksHeap = 'tasksHeap',
}

export type TTaskId = string

export interface ITask {
  type: string
  in: TTaskId[]
  out: TTaskId[]
}

export interface ITasksHeap {
  [key: TTaskId]: ITask
}

export interface IStoreScenario {
  taskIsMoving: boolean
  tasksHeap: ITasksHeap
}
