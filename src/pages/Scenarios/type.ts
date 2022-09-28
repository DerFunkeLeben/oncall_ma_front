import { ITask } from 'types'
import { TasksTypes } from 'types'

export interface ITaskNode {
  settings: ITask
  id?: string
}
export interface ITaskIcon {
  type: TasksTypes
  status: string
  color: string
}
export interface IPageData {
  link: string
  name: string
  route: string[]
}
