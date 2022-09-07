import ActionType from './action-type'
import { IStoreAuth, StoreKeys } from './_data-types'

const ActionCreator = {
  setUser: (user: IStoreAuth[StoreKeys.user]) => ({
    type: ActionType.SET_USER,
    payload: { user },
  }),
  setAuthData: (authData: IStoreAuth[StoreKeys.authData]) => ({
    type: ActionType.SET_AUTH_DATA,
    payload: authData,
  }),
}

export default ActionCreator
