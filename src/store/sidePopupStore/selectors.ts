import { IState } from '../data-types'
import { StoreKeys, IStoreSidePopup } from './_data-types'

const getTempSettings = (state: IState): IStoreSidePopup[StoreKeys.tempSettings] | void =>
  state?.sidePopup?.tempSettings

export { getTempSettings }
