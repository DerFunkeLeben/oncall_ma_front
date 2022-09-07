import { AlertBoxIcons } from 'constants/dictionary'
import { FC, SVGProps } from 'react'

export interface IPageData {
  link: string
  name: string
  route: string[]
}

export interface IPagesData {
  [key: string]: IPageData
}

export interface IUser {
  id: string
  email: string
  agency: string
  role?: string
  confirmed?: boolean
}
export interface ITask {
  type: TasksTypes
  color: string
  status: string
  name: string
  input?: string[]
  output?: string[]
  settings?: { [key: string]: any }
}

export interface ITasksHeap {
  [key: string]: ITask
}

export type TObject = {
  [key: string]: any
}

export interface IFolder {
  name: string
  id: string
  count: number
  isMainFolder?: boolean
}

export interface ICheckMenuConfig {
  caption: string
  Icon: FC<SVGProps<SVGSVGElement>>
  handleClick: () => void
  modificators?: string[]
}

export interface IAlertBox {
  message: string
  isOpen: boolean
  icon: AlertBoxIcons | undefined
}

export interface IMessageBox {
  title: string
  isOpen: boolean
  buttons: string[]
  handleConfirm?: () => void
}

export enum TasksTypes {
  list = 'list',
  event = 'event',
  email = 'email',
  sms = 'sms',
  telegram = 'telegram',
  push = 'push',
  condition = 'condition',
  wait = 'wait',
  join = 'join',
  ab_test = 'ab_test',
  assignment = 'assignment',
  crm_message = 'crm_message',
  exit = 'exit',
  start = 'start',
}

export enum TasksDefaultNames {
  start = 'Начало',
  list = 'Список',
  event = 'Событие',
  email = 'Email',
  sms = 'SMS',
  telegram = 'Telegram',
  push = 'Push-уведомление',
  condition = 'Условие',
  wait = 'Ожидание',
  join = 'Объединение',
  ab_test = 'А/Б тест',
  assignment = 'Присвоение атрибута',
  crm_message = 'CRM сообщение',
  exit = 'Выход',
}

export enum TaskStorageFolders {
  scenario_creation = 'Создание сценария',
  communication = 'Коммуникация',
  scenarios = 'Сценарии',
}

export enum FolderAction {
  CREATE,
  DELETE,
  RENAME,
}
