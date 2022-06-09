import { IStoreAuth } from './auth/_data-types'

interface IStoreHuith {
  hui: boolean
}

export interface IState {
  auth?: IStoreAuth
  huiUth?: IStoreHuith
}
