import { IStoreAuth } from './auth/_data-types'
import { IStoreContent } from './content/_data-types'
import { IStoreScenario } from './scenario/_data-types'

export interface IState {
  auth?: IStoreAuth
  scenario?: IStoreScenario
  content: IStoreContent
}
export interface IReducer {
  type: string
  payload: any
}
