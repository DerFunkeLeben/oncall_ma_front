import { IFolder } from 'types'

export function foldersSort(folders: IFolder[]) {
  return folders.sort((a, b) => {
    if (a.isMainFolder) return -Infinity
    return b.count - a.count
  })
}

export function getFolderNameMatch(
  folders: IFolder[],
  name: string,
  id: string | undefined
): boolean {
  const foundFolder = folders.find((folder) => folder.name === name)
  const notCurrentFolder = foundFolder?.id !== id
  return Boolean(foundFolder) && notCurrentFolder
}
