import { createSelector } from 'reselect'
import { IState } from '../data-types'
import { StoreKeys, IStoreContent } from './_data-types'

const getContent = (state: IState): IStoreContent[StoreKeys.allContent] => state.content.allContent

const getCurrentContent = (state: IState): IStoreContent[StoreKeys.currentContent] =>
  state.content[StoreKeys.currentContent]

const getAllContent = createSelector(getContent, (contents) => Object.values(contents).flat())

const getAllContentIds = createSelector(
  getAllContent,
  (contents) => contents.map(({ id }) => id).filter((id) => id) as string[]
)

const getTitle = (_: any, title: string) => title
const getTitleMatch = createSelector(getAllContent, getTitle, (content, titleToCheck) =>
  content.find(({ title }) => title === titleToCheck)
)

const getFolders = (state: IState): IStoreContent[StoreKeys.allFolders] => state.content.allFolders

const getCurrentFolder = (state: IState): IStoreContent[StoreKeys.currentFolder] =>
  state.content[StoreKeys.currentFolder]

const getAllFolders = createSelector(getFolders, (folders) => Object.values(folders).flat())

const getAllFoldersIds = createSelector(
  getAllFolders,
  (folders) => folders.map(({ id }) => id).filter((id) => id) as string[]
)

export {
  getCurrentContent,
  getAllContent,
  getAllContentIds,
  getTitleMatch,
  getCurrentFolder,
  getAllFolders,
  getAllFoldersIds,
}
