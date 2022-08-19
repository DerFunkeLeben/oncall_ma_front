import { ITask } from 'types'
import { TasksTypes } from 'types'

export interface ITaskNode {
  properties: ITask
  id?: string
}
export interface ITaskIcon {
  type: TasksTypes
  status: string
  color: string
}
