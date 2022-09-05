import { v4 as uuid } from 'uuid'
import ActionType from './action-type'
import { IStoreFolder, FolderKeys } from './_data-types'
import { IReducer, MainReducerKeys } from 'store/data-types'

const defaultState: IStoreFolder = {
  allFolders: {},
  activeFolderId: '',
  mainFolderId: '',
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
      case ActionType.VIEW_FOLDER: {
        return {
          ...state,
          [FolderKeys.activeFolderId]: payload,
        }
      }
      case ActionType.CREATE_FOLDER: {
        const id = uuid()
        const newFolder = { ...payload, id }
        return {
          ...state,
          [FolderKeys.allFolders]: { ...state.allFolders, [id]: newFolder },
        }
      }

      case ActionType.RENAME_FOLDER: {
        return {
          ...state,
          [FolderKeys.allFolders]: { ...state.allFolders, [payload.id]: payload },
        }
      }

      case ActionType.DELETE_FOLDER: {
        const { [payload.id]: _, ...otherFolders } = state.allFolders
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

  const mainFolderId: string = state.mainFolderId
  const mainFolder = state.allFolders[mainFolderId]

  return {
    ...state,
    [FolderKeys.allFolders]: {
      ...state.allFolders,
      [mainFolderId]: { ...mainFolder, count: mainFolder.count + delta },
      [payload]: { ...currFolder, count: currFolder.count + delta },
    },
  }
}
export { foldersReducer }
