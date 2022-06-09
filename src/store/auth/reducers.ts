import ActionType from './action-type'
import { IStoreAuth } from './_data-types'
import { IActions } from './actions'

const initialState: IStoreAuth = {
  user: {},
}

const reducer = (state = initialState, { type, payload }: IActions): IStoreAuth => {
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

export { reducer, initialState }
