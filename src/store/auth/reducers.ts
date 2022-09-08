import ActionType from './action-type'
import { IReducer } from 'store/data-types'
import { IStoreAuth } from './_data-types'

const initialAuthState: IStoreAuth = {
  user: {},
}

const reducer = (state = initialAuthState, { type, payload }: IReducer): IStoreAuth => {
  switch (type) {
    case ActionType.SET_USER:
      return {
        ...state,
        user: payload.user,
      }
    default:
      return state
  }
}

export { reducer, initialAuthState }
