import { IStoreAuth } from './auth/_data-types'
import { IStoreScenario } from './scenario/_data-types'
import { IStoreSidePopup } from './sidePopupStore/_data-types'

export interface IState {
  auth?: IStoreAuth
  scenario?: IStoreScenario
  sidePopup?: IStoreSidePopup
}
export interface IReducer {
  type: string
  payload: any
}
