import { IUser } from 'types'

export enum StoreKeys {
  user = 'user',
}

export interface IStoreAuth {
  [StoreKeys.user]: IUser | Record<string, unknown>
}
