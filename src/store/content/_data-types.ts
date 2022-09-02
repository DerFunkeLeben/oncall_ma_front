import { ContentAction } from 'constants/content'
import { FolderAction, IFolder } from 'types'
import { IContent } from 'types/content'

export enum StoreKeys {
  allContent = 'allContent',
  allFolders = 'allFolders',
  currentContent = 'currentContent',
  currentFolder = 'currentFolder',
}

export interface IStoreContent {
  [StoreKeys.allContent]: { [key: string]: IContent }
  [StoreKeys.allFolders]: { [key: string]: IFolder }
  [StoreKeys.currentContent]: {
    content: IContent | undefined
    contentAction: ContentAction
  }
  [StoreKeys.currentFolder]: {
    folder: IFolder | undefined
    folderAction: FolderAction
  }
}
