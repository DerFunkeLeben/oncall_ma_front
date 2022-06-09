import ActionType from './action-type'
import { IStoreAuth, StoreKeys } from './_data-types'

const ActionCreator = {
  setUser: (user: IStoreAuth[StoreKeys.user]) => ({
    type: ActionType.SET_USER,
    payload: { user },
  }),
}

type ISetUser = { type: string; payload: { user: IStoreAuth[StoreKeys.user] } }

export type IActions = ISetUser

export default ActionCreator
