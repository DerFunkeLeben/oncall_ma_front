import ActionType from './action-type'
import { IStoreSidePopup } from './_data-types'
import { IReducer } from '../data-types'
import { TasksTypes } from 'types'

const initialState: IStoreSidePopup = {
  tempSettings: {},
}

const reducer = (state = initialState, { type, payload }: IReducer): IStoreSidePopup => {
  switch (type) {
    case ActionType.SET_TEMPSETTINGS:
      return {
        ...state,
        tempSettings: payload.tempSettings,
      }
    default:
      return state
  }
}

export { reducer, initialState }
