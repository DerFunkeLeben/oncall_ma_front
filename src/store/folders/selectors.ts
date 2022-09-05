import { createSelector } from 'reselect'
import { IState } from '../data-types'
import { FolderKeys, IStoreFolder } from './_data-types'
import { MainReducerKeys } from 'store/data-types'
import { foldersSort } from './utils'

const getFolders = (
  state: IState,
  reducerName: keyof typeof MainReducerKeys
): IStoreFolder[FolderKeys.allFolders] => state[reducerName].folders[FolderKeys.allFolders]

const getActiveFolderId = (state: IState, reducerName: keyof typeof MainReducerKeys): string =>
  state[reducerName].folders[FolderKeys.activeFolderId]

const getAllFolders = createSelector(getFolders, (folders) =>
  foldersSort(Object.values(folders).flat())
)

const getAllFoldersIds = createSelector(
  getAllFolders,
  (folders) => folders.map(({ id }) => id).filter((id) => id) as string[]
)

export { getActiveFolderId, getAllFolders, getAllFoldersIds }
