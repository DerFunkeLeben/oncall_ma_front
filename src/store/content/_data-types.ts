import { IFolder } from 'types'
import { IContent } from 'types/content'

export enum StoreKeys {
  allContent = 'allContent',
  folders = 'folders',
  currentContent = 'currentContent',
  currentFolder = 'currentFolder',
}

export interface IStoreContent {
  [StoreKeys.allContent]: IContent[]
  [StoreKeys.folders]: IFolder[]
  [StoreKeys.currentContent]: {
    content: IContent | undefined
    contentAction: null // TODO
  }
  [StoreKeys.currentFolder]: {
    folder: IFolder | undefined
    folderAction: null // TODO
  }
}
