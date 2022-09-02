import { IFolder } from 'types'
import ActionType from './action-type'
import { IStoreFolder, StoreKeys } from './_data-types'

const ActionCreator = {
  viewFolder: (folder: IStoreFolder[StoreKeys.currentFolder]) => ({
    type: ActionType.VIEW_FOLDER,
    payload: folder,
  }),
  createFolder: (folder: IFolder) => ({
    type: ActionType.CREATE_FOLDER,
    payload: folder,
  }),
  renameFolder: (folder: IFolder) => ({
    type: ActionType.RENAME_FOLDER,
    payload: folder,
  }),
  deleteFolder: (folder: IFolder) => ({
    type: ActionType.DELETE_FOLDER,
    payload: folder,
  }),
}

export default ActionCreator
