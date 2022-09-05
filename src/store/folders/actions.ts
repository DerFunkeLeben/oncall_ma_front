import { MainReducerKeys } from 'store/data-types'
import { IFolder } from 'types'
import ActionType from './action-type'

const ActionCreator = {
  viewFolder: (folderId: string, reducerName: MainReducerKeys) => ({
    type: ActionType.VIEW_FOLDER,
    payload: folderId,
    name: reducerName,
  }),
  createFolder: (folder: IFolder, reducerName: MainReducerKeys) => ({
    type: ActionType.CREATE_FOLDER,
    payload: folder,
    name: reducerName,
  }),
  renameFolder: (folder: IFolder, reducerName: MainReducerKeys) => ({
    type: ActionType.RENAME_FOLDER,
    payload: folder,
    name: reducerName,
  }),
  deleteFolder: (folder: IFolder, reducerName: MainReducerKeys) => ({
    type: ActionType.DELETE_FOLDER,
    payload: folder,
    name: reducerName,
  }),
}

export default ActionCreator
