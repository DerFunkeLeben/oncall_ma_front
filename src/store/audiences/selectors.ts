import { IState } from '../data-types'
import { StoreKeys, IStoreAudiences } from './_data-types'

const getCurrentAudience = (state: IState): IStoreAudiences[StoreKeys.currentAudience] =>
  state.audiences.data[StoreKeys.currentAudience]

export { getCurrentAudience }
