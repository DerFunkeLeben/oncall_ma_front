import { ITasksHeap } from '../../types'
export enum StoreKeys {
  taskIsMoving = 'taskIsMoving',
  tasksHeap = 'tasksHeap',
}
export interface IStoreScenario {
  taskIsMoving: boolean
  tasksHeap: ITasksHeap
}
