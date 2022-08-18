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
  input?: string[]
  output?: string[]
}

export interface ITasksHeap {
  [key: string]: ITask
}
export type TObject = {
  [key: string]: any
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
}

export enum TasksDefaultNames {
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
}
