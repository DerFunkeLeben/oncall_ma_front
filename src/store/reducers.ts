import { combineReducers } from 'redux'

import Auth from './auth'
import Scenario from './scenario'
import Content from './content'

export const reducer = combineReducers({
  auth: Auth.reducer,
  scenario: Scenario.reducer,
  content: Content.reducer,
})
