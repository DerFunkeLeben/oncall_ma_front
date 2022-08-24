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
  email: string
}
export interface ITask {
  type: TasksTypes
  color: string
  status: string
  name: string
  input?: string[]
  output?: string[]
}

export interface ITasksHeap {
  [key: string]: ITask
}

export type TObject = {
  [key: string]: any
}

export interface IFolderConfig {
  name: string
  id: string
  count: number
}

export interface ICheckMenuConfig {
  caption: string
  Icon: FC<SVGProps<SVGSVGElement>>
  handleClick: () => void
  modificators?: string[]
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
