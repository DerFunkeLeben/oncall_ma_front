import ActionType from './action-type'
import { IStoreScenario, StoreKeys } from './_data-types'

const ActionCreator = {
  setTaskIsMoving: (taskIsMoving: IStoreScenario[StoreKeys.taskIsMoving]) => ({
    type: ActionType.SET_TASKISMOVING,
    payload: { taskIsMoving },
  }),
  setTasksHeap: (tasksHeap: IStoreScenario[StoreKeys.tasksHeap]) => ({
    type: ActionType.ADD_TASK,
    payload: { tasksHeap },
  }),
}

type ISetTaskIsMooving = {
  type: string
  payload: { taskIsMoving: IStoreScenario[StoreKeys.taskIsMoving] }
}
type ISetTasksHeap = {
  type: string
  payload: { tasksHeap: IStoreScenario[StoreKeys.tasksHeap] }
}

export type IActions = ISetTaskIsMooving | ISetTasksHeap

export default ActionCreator
