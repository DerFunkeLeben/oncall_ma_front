import ActionType from './action-type'
import { IStoreFolder, FolderKeys } from './_data-types'
import { IReducer, MainReducerKeys } from 'store/data-types'
import { IFolder } from 'types'
import { calculateFolders } from './utils'
import { v4 as uuid } from 'uuid'

const defaultState: IStoreFolder = {
  allFolders: {},
  activeFolderName: '',
  mainFolderName: '',
}

interface IFolderReducer extends IReducer {
  name: MainReducerKeys
}

const foldersReducer = (reducerName: MainReducerKeys) => {
  return (state = defaultState, action: IFolderReducer): IStoreFolder => {
    const { type, payload, name } = action

    // чтобы не менять все редюсеры, где есть folders, меняем только нужный
    if (reducerName !== name) return state

    switch (type) {
      case ActionType.INIT_ALL_FOLDERS:
        return {
          ...state,
          [FolderKeys.allFolders]: { ...state.allFolders, ...calculateFolders(payload) },
        }

      case ActionType.VIEW_FOLDER:
        return {
          ...state,
          [FolderKeys.activeFolderName]: payload,
        }

      case ActionType.CREATE_FOLDER:
        return {
          ...state,
          [FolderKeys.allFolders]: { ...state.allFolders, [payload.name]: payload },
        }

      case ActionType.RENAME_FOLDER: {
        const { [payload.name]: _, ...otherFolders } = state.allFolders
        return {
          ...state,
          [FolderKeys.allFolders]: {
            ...otherFolders,
            [payload.newName]: {
              name: payload.newName,
              count: payload.count,
            },
          },
        }
      }

      case ActionType.DELETE_FOLDER: {
        const { [payload.name]: _, ...otherFolders } = state.allFolders
        return {
          ...state,
          [FolderKeys.allFolders]: otherFolders,
        }
      }

      case ActionType.INCREMENT_FOLDER:
        return changeFolderSize(state, 1, payload)

      case ActionType.DECREMENT_FOLDER:
        return changeFolderSize(state, -1, payload)

      default:
        return state
    }
  }
}

function changeFolderSize(state = defaultState, delta = 1, payload: any) {
  const currFolder = state.allFolders[payload]

  const mainFolderName: string = state.mainFolderName
  const mainFolder = state.allFolders[mainFolderName]

  return {
    ...state,
    [FolderKeys.allFolders]: {
      ...state.allFolders,
      [mainFolderName]: { ...mainFolder, count: mainFolder.count + delta },
      [payload]: { ...currFolder, count: currFolder.count + delta },
    },
  }
}
export { foldersReducer }
