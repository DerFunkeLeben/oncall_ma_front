import { IFolder } from 'types'
import { v4 as uuid } from 'uuid'

export function foldersSort(folders: IFolder[]) {
  const [mainFolder, ...otherFolders] = folders
  const sortedFolders = otherFolders.sort((a, b) => b.count - a.count)
  return [mainFolder, ...sortedFolders]
}

export function findFolderById(data: IFolder[], id: string | undefined) {
  return data.find((el) => el.name == id)
}

export function getFolderNameMatch(
  folders: IFolder[],
  name: string,
  id: string | undefined
): boolean {
  const foundFolder = folders.find((folder) => folder.name === name)
  const notCurrentFolder = foundFolder?.name !== id
  return Boolean(foundFolder) && notCurrentFolder
}

export function calculateFolders(payload: any[], mainFolderName: string) {
  const newFoldersSet = payload.reduce((acc: any, el: any) => {
    acc[el.group] = (acc[el.group] || 0) + 1
    return acc
  }, {})

  const newFoldersObj = Object.entries(newFoldersSet).reduce((acc: any, el: any) => {
    const [folderName, count] = el

    if (mainFolderName !== folderName)
      acc[folderName] = {
        name: folderName,
        count,
      }
    return acc
  }, {})

  newFoldersObj[mainFolderName] = {
    name: mainFolderName,
    count: payload.length,
    isMainFolder: true,
  }

  return newFoldersObj
}
