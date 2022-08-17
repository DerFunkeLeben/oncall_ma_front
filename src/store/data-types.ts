import { IStoreAuth } from './auth/_data-types'
import { IStoreScenario } from './scenario/_data-types'

export interface IState {
  auth?: IStoreAuth
  scenario?: IStoreScenario
}
export interface IReducer {
  type: string
  payload: any
}
