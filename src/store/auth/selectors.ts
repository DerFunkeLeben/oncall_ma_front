import { IState } from '../data-types'
import { StoreKeys, IStoreAuth } from './_data-types'

const getUser = (state: IState): IStoreAuth[StoreKeys.user] => state.auth.user

export { getUser }
