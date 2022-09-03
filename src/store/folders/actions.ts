import { IFolder } from 'types'
import ActionType from './action-type'

const ActionCreator = {
  viewFolder: (folderId: string) => ({
    type: ActionType.VIEW_FOLDER,
    payload: folderId,
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
