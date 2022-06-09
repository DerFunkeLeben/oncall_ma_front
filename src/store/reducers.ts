import { combineReducers } from 'redux'

import Auth from './auth'

export const reducer = combineReducers({
  auth: Auth.reducer,
})
