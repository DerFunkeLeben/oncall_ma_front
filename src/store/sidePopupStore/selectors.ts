import { IState } from '../data-types'
import { StoreKeys, IStoreSidePopup } from './_data-types'

const getTempSettings = (state: IState): IStoreSidePopup[StoreKeys.tempSettings] | void =>
  state?.sidePopup?.tempSettings

const getStep = (state: IState): IStoreSidePopup[StoreKeys.stepNumber] =>
  state?.sidePopup?.stepNumber as number

export { getTempSettings, getStep }
