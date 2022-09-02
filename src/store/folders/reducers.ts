import { v4 as uuid } from 'uuid'
import ActionType from './action-type'
import { IStoreFolder, StoreKeys } from './_data-types'
import { IReducer } from '../data-types'
import { FolderAction } from 'types'

const initialFolderState: IStoreFolder = {
  allFolders: {},
  currentFolder: {
    folder: undefined,
    folderAction: FolderAction.CREATE,
  },
}

const foldersReducer = (state = initialFolderState, { type, payload }: IReducer): IStoreFolder => {
  switch (type) {
    case ActionType.VIEW_FOLDER:
      return {
        ...state,
        [StoreKeys.currentFolder]: payload,
      }

    case ActionType.CREATE_FOLDER: {
      const id = uuid()
      const newFolder = { ...payload, id }
      return {
        ...state,
        [StoreKeys.allFolders]: { ...state.allFolders, [id]: newFolder },
      }
    }

    case ActionType.DELETE_FOLDER: {
      const { [payload.id]: _, ...otherFolders } = state.allFolders
      return {
        ...state,
        [StoreKeys.allFolders]: otherFolders,
      }
    }

    default:
      return state
  }
}

export { foldersReducer, initialFolderState }
