import ActionType from './action-type'
import { IStoreScenario, StoreKeys } from './_data-types'

const ActionCreator = {
  setTaskIsMoving: (taskIsMoving: IStoreScenario[StoreKeys.taskIsMoving]) => ({
    type: ActionType.SET_TASKISMOVING,
    payload: { taskIsMoving },
  }),
  setTasksHeap: (tasksHeap: IStoreScenario[StoreKeys.tasksHeap]) => {
    console.log({ tasksHeap })
    return {
      type: ActionType.ADD_TASK,
      payload: { tasksHeap },
    }
  },
  setScenario: (scenario: IStoreScenario[StoreKeys.scenario]) => {
    return {
      type: ActionType.SET_SCENARIO,
      payload: { scenario },
    }
  },
  setAllScenaries: (allScenaries: IStoreScenario[StoreKeys.allScenaries]) => {
    console.log({ allScenaries })
    return {
      type: ActionType.SET_ALL_SCENARIES,
      payload: allScenaries,
    }
  },
}

type ISetTaskIsMooving = {
  type: string
  payload: { taskIsMoving: IStoreScenario[StoreKeys.taskIsMoving] }
}
type ISetTasksHeap = {
  type: string
  payload: { tasksHeap: IStoreScenario[StoreKeys.tasksHeap] }
}
type ISetScenario = {
  type: string
  payload: { scenario: IStoreScenario[StoreKeys.scenario] }
}

export type IActions = ISetTaskIsMooving | ISetTasksHeap | ISetScenario

export default ActionCreator
