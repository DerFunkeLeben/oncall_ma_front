import { IFolder } from 'types'

export enum FolderKeys {
  allFolders = 'allFolders',
  activeFolderId = 'activeFolderId',
  mainFolderId = 'mainFolderId',
}

export interface IStoreFolder {
  [FolderKeys.allFolders]: { [key: string]: IFolder }
  [FolderKeys.activeFolderId]: string
  [FolderKeys.mainFolderId]: string
}
