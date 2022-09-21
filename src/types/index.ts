import { AlertBoxIcons } from 'constants/dictionary'
import { FC, SVGProps } from 'react'
import { MainReducerKeys } from 'store/data-types'

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
  properties: { [key: string]: any }
  available?: boolean
  placed: boolean
}

export interface ITasksHeap {
  [key: string]: ITask
}

export interface IScenario {
  name: string
  startDate: number
  scenarioType: 'single' | 'reccuring' | 'schedule'
  scenarioId?: string
}

export type IAllScenaries = TScenarioObj[]

export type TScenarioObj = {
  start: 'string'
  id: 'string'
  events: any
}

export type TObject = {
  [key: string]: any
}

export interface IFolder {
  name: string
  count: number
  isMainFolder?: boolean
  newName?: string
}

export interface ICheckMenuConfig {
  option: CheckMenuAction
  handleClick?: () => void
  reducerName?: MainReducerKeys
}

export interface IEmptyTableConfig {
  isActive: boolean
  caption: string
  Icon: FC<SVGProps<SVGSVGElement>>
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

export interface ICreateOption {
  title: string
  url?: string
  action?: () => void
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
  finish = 'finish',
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
  finish = 'Выход',
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

export enum CheckMenuAction {
  COPY,
  DELETE,
  MOVE_TO_FOLDER,
  SEND_TEST,
}
