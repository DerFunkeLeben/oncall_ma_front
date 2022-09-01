import ActionType from './action-type'
import { IStoreContent } from './_data-types'
import { IReducer } from '../data-types'
import { TasksTypes } from 'types'

const initialState: IStoreContent = {
  allContent: [],
  folders: [],
  currentContent: {
    content: null,
    contentAction: null,
  },
  currentFolder: {
    folder: null,
    folderAction: null,
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
