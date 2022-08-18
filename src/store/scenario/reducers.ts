import ActionType from './action-type'
import { IStoreScenario } from './_data-types'
import { IReducer } from '../data-types'

const initialState: IStoreScenario = {
  taskIsMoving: false,
  tasksHeap: {
    '1': {
      type: 'start',
      input: [],
      output: ['2'],
    },
    '2': {
      type: 'exit',
      input: ['1'],
      output: [],
    },
  },
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
    default:
      return state
  }
}

export { reducer, initialState }
