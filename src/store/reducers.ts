import { combineReducers } from 'redux'

import Auth from './auth'
import Scenario from './scenario'

export const reducer = combineReducers({
  auth: Auth.reducer,
  scenario: Scenario.reducer,
})
