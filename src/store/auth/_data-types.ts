import { IUser } from 'types'

export enum StoreKeys {
  user = 'user',
  accessToken = 'accessToken',
  // expiresIn = 'expiresIn',
  authData = 'authData',
}

export interface IAuthData {
  [StoreKeys.accessToken]: string
  // [StoreKeys.expiresIn]: number
}

export interface IStoreAuth {
  [StoreKeys.user]: IUser | Record<string, unknown>
  [StoreKeys.authData]: IAuthData
}
