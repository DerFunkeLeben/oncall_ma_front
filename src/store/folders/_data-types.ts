import { FolderAction, IFolder } from 'types'

export enum StoreKeys {
  allFolders = 'allFolders',
  currentFolder = 'currentFolder',
}

export interface IStoreFolder {
  [StoreKeys.allFolders]: { [key: string]: IFolder }
  [StoreKeys.currentFolder]: {
    folder: IFolder | undefined
    folderAction: FolderAction
  }
}
