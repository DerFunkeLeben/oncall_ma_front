import { IFolder } from 'types'

export function foldersSort(folders: IFolder[]) {
  return folders.sort((a, b) => {
    if (a.isMainFolder) return -Infinity
    return b.count - a.count
  })
}
