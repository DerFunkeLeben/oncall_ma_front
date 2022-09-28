import { ITasksHeap, IScenario, IAllScenaries } from '../../types'
export enum StoreKeys {
  taskIsMoving = 'taskIsMoving',
  tasksHeap = 'tasksHeap',
  scenario = 'scenario',
  allScenaries = 'allScenaries',
}
export interface IStoreScenario {
  taskIsMoving: boolean
  tasksHeap: ITasksHeap
  scenario: IScenario
  allScenaries: IAllScenaries
}
