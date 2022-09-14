import { createSelector } from 'reselect'
import { IState } from '../data-types'
import { FolderKeys, IStoreFolder } from './_data-types'
import { MainReducerKeys } from 'store/data-types'
import { foldersSort } from './utils'

const getFolders = (
  state: IState,
  reducerName: keyof typeof MainReducerKeys
): IStoreFolder[FolderKeys.allFolders] => state[reducerName].folders[FolderKeys.allFolders]

const getActiveFolderName = (state: IState, reducerName: keyof typeof MainReducerKeys): string =>
  state[reducerName].folders[FolderKeys.activeFolderName]

const getMainFolderName = (state: IState, reducerName: keyof typeof MainReducerKeys): string =>
  state[reducerName].folders[FolderKeys.mainFolderName]

const getAllFolders = createSelector(getFolders, (folders) =>
  foldersSort(Object.values(folders).flat())
)

const getAllFoldersNames = createSelector(
  getAllFolders,
  (folders) => folders.map(({ name }) => name).filter((name) => name) as string[]
)

export { getActiveFolderName, getAllFolders, getAllFoldersNames, getMainFolderName }
