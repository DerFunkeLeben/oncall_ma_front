// тип, который приходит с бэка
export enum ContentTypes {
  HTML = 'email',
  // TODO:
  SMS = 'SMS',
  FILE = 'File',
  IMAGE = 'Image',
  PDF = 'PDF',
}

// тип, который показываем на фронте
export const ContentTypeLabels = {
  [ContentTypes.HTML]: 'HTML',
  // TODO:
  [ContentTypes.SMS]: 'SMS',
  [ContentTypes.FILE]: 'FILE',
  [ContentTypes.IMAGE]: 'IMAGE',
  [ContentTypes.PDF]: 'PDF',
}

export interface IContent {
  title: string
  type: `${ContentTypes}`
  createdAt?: string
  updatedAt?: string
  id?: string
  originalName?: string
  folderName?: string
  theme?: string
  preheader?: string
  HTML?: string
  SMStext?: string
}

export interface IContentHTML extends IContent {
  theme: string
  preheader: string
  HTML?: string
}

export interface IContentSMS extends IContent {
  SMStext: string
}

export interface IContentFile extends IContent {
  filePath: string // TODO:
}

// export type IContent = IContentHTML | IContentSMS | IContentFile
