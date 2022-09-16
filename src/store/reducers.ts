import { combineReducers } from 'redux'

import Auth from './auth'
import Audiences from './audiences'
import Scenario from './scenario'
import Content from './content'
import Doctors from './doctors'
import SidePopupStore from './sidePopupStore'

export const reducer = combineReducers({
  auth: Auth.reducer,
  scenario: Scenario.reducer,
  content: Content.reducer,
  audiences: Audiences.reducer,
  doctors: Doctors.reducer,
  sidePopup: SidePopupStore.reducer,
})
