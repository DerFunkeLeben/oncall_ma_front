export enum ContentTypes {
  HTML = 'HTML',
  SMS = 'SMS',
  FILE = 'File',
  IMAGE = 'Image',
  PDF = 'PDF',
}

export interface IContentDefault {
  id?: string
  type: `${ContentTypes}`
  createDate?: Date | string
  lastUpdateDate?: Date | string
  title: string
  folderName?: string
}

export interface IContentHTML extends IContentDefault {
  theme: string
  preheader: string
  HTML?: string
}

export interface IContentSMS extends IContentDefault {
  text: string
}

export interface IContentFile extends IContentDefault {
  filePath: string // TODO:
}

export type IContent = IContentHTML | IContentSMS | IContentFile
