import { IFolder } from 'types'

export enum FolderKeys {
  allFolders = 'allFolders',
  activeFolderName = 'activeFolderName',
  mainFolderName = 'mainFolderName',
}

export interface IStoreFolder {
  [FolderKeys.allFolders]: { [key: string]: IFolder }
  [FolderKeys.activeFolderName]: string
  [FolderKeys.mainFolderName]: string
}
