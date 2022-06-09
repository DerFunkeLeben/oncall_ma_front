import { IUser } from 'types'

export enum StoreKeys {
  user = 'user',
}

export interface IStoreAuth {
  user: IUser
}
