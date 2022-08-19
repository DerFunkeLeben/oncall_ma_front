import ActionType from './action-type'
import { IStoreScenario } from './_data-types'
import { IReducer } from '../data-types'
import { TasksTypes } from 'types'

const initialState: IStoreScenario = {
  taskIsMoving: false,
  tasksHeap: {
    '1': {
      type: TasksTypes.list,
      color: 'orange',
      status: 'clear',
      name: 'Старт',
      input: [],
      output: ['2'],
    },
    '2': {
      type: TasksTypes.exit,
      color: 'green',
      status: 'clear',
      name: 'Выход',
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
