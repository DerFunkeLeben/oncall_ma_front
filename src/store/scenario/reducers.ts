import ActionType from './action-type'
import { IStoreScenario } from './_data-types'
import { IReducer } from '../data-types'
import { TasksTypes } from 'types'
import initHeap from './const'

const initialState: IStoreScenario = {
  taskIsMoving: false,
  tasksHeap: initHeap,
  scenario: {
    name: 'Сценарий',
    startDate: Date.now(),
    scenarioType: 'single',
  },
  allScenaries: [],
}

const reducer = (state = initialState, { type, payload }: IReducer): IStoreScenario => {
  switch (type) {
    case ActionType.SET_TASKISMOVING:
      return {
        ...state,
        taskIsMoving: payload.taskIsMoving,
      }
    case ActionType.ADD_TASK:
      return {
        ...state,
        tasksHeap: payload.tasksHeap,
      }
    case ActionType.SET_SCENARIO:
      return {
        ...state,
        scenario: payload.scenario,
      }
    default:
      return state
  }
}

export { reducer, initialState }
