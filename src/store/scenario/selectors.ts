import { IState } from '../data-types'
import { StoreKeys, IStoreScenario } from './_data-types'

const getTaskIsMoving = (state: IState): IStoreScenario[StoreKeys.taskIsMoving] | void =>
  state?.scenario?.taskIsMoving

const getTasksHeap = (state: IState): IStoreScenario[StoreKeys.tasksHeap] | void =>
  state?.scenario?.tasksHeap

const getScenario = (state: IState): IStoreScenario[StoreKeys.scenario] | void =>
  state?.scenario?.scenario

const getAllScenaries = (state: IState): IStoreScenario[StoreKeys.allScenaries] | void =>
  state?.scenario?.allScenaries

export { getTaskIsMoving, getTasksHeap, getScenario, getAllScenaries }
