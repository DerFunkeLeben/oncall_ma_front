import { combineReducers } from 'redux'

import Auth from './auth'
import Scenario from './scenario'
import SidePopupStore from './sidePopupStore'

export const reducer = combineReducers({
  auth: Auth.reducer,
  scenario: Scenario.reducer,
  sidePopup: SidePopupStore.reducer,
})
