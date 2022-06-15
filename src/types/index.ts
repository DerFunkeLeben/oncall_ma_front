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
