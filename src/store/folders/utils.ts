import { IFolder } from 'types'
import { v4 as uuid } from 'uuid'

export function foldersSort(folders: IFolder[]) {
  const sortedFolders = folders.sort((a, b) => {
    if (a.isMainFolder) return -Infinity
    return b.count - a.count
  })
  return sortedFolders
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
  const newFoldersObj = payload.reduce((acc: any, el: any) => {
    const { group, count } = el

    if (mainFolderName !== group)
      acc[group] = {
        name: group,
        count: +count,
      }
    return acc
  }, {})

  const allFoldersCount = payload.reduce((acc: any, el: any) => acc + Number(el.count), 0)

  newFoldersObj[mainFolderName] = {
    name: mainFolderName,
    count: allFoldersCount,
    isMainFolder: true,
  }

  return newFoldersObj as { [key: string]: IFolder }
}
