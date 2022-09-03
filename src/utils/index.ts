import { IFolder } from 'types'

export function reduceBigNumbers(num: number) {
  if (num < 999) return num
  if (num > 9500) return '9K+'
  return Math.round(num / 100) / 10 + 'K'
}

export function findFolderById(data: IFolder[], id: string | undefined) {
  return data.find((el) => el.id == id)
}
