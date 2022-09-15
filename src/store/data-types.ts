import { IStoreAudiences } from './audiences/_data-types'
import { IStoreAuth } from './auth/_data-types'
import { IStoreContent } from './content/_data-types'
import { IStoreDoctors } from './doctors/_data-types'
import { IStoreFolder } from './folders/_data-types'
import { IStoreScenario } from './scenario/_data-types'
import { IStoreSidePopup } from './sidePopupStore/_data-types'

export enum MainReducerKeys {
  audiences = 'audiences',
  content = 'content',
  // scenario = 'scenario',
}

export interface IState {
  auth: IStoreAuth
  doctors?: IStoreDoctors
  scenario?: IStoreScenario
  [MainReducerKeys.audiences]: {
    data: IStoreAudiences
    folders: IStoreFolder
  }
  [MainReducerKeys.content]: {
    data: IStoreContent
    folders: IStoreFolder
  }
  sidePopup?: IStoreSidePopup
}
export interface IReducer {
  type: string
  payload: any
}
