import { IStoreAuth } from './auth/_data-types'
import { IStoreContent } from './content/_data-types'
import { IStoreFolder } from './folders/_data-types'
import { IStoreScenario } from './scenario/_data-types'

export enum StoreKeys {
  auth = 'auth',
  scenario = 'scenario',
  content = 'content',
}

export interface IState {
  [StoreKeys.auth]?: IStoreAuth
  [StoreKeys.scenario]?: IStoreScenario
  [StoreKeys.content]: {
    data: IStoreContent
    folders: IStoreFolder
  }
}
export interface IReducer {
  type: string
  payload: any
}
