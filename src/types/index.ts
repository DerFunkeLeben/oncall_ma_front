export interface IPageData {
  link: string
  name: string
  route: string[]
}

export interface IPagesData {
  [key: string]: IPageData
}

export interface IUser {
  email: string
}
export interface ITask {
  type: string
  in?: string[]
  out?: string[]
}
export interface ITasksHeap {
  [key: string]: ITask
}
export type TObject = {
  [key: string]: any
}
