import { v4 as uuid } from 'uuid'
import ActionType from './action-type'
import { IStoreFolder, FolderKeys } from './_data-types'
import { IReducer } from '../data-types'

const initialFolderState: IStoreFolder = {
  allFolders: {},
  activeFolderId: '0',
}

const foldersReducer = (state = initialFolderState, { type, payload }: IReducer): IStoreFolder => {
  switch (type) {
    case ActionType.VIEW_FOLDER:
      return {
        ...state,
        [FolderKeys.activeFolderId]: payload,
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

    default:
      return state
  }
}

export { foldersReducer, initialFolderState }
