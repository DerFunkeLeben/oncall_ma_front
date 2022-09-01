import { IState } from '../data-types'
import { StoreKeys, IStoreScenario } from './_data-types'

const getTaskIsMoving = (state: IState): IStoreScenario[StoreKeys.taskIsMoving] | void =>
  state?.scenario?.taskIsMoving

const getTasksHeap = (state: IState): IStoreScenario[StoreKeys.tasksHeap] | void =>
  state?.scenario?.tasksHeap

export { getTaskIsMoving, getTasksHeap }
