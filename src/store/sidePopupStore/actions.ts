import ActionType from './action-type'
import { IStoreSidePopup, StoreKeys } from './_data-types'

const ActionCreator = {
  setTempSettings: (tempSettings: IStoreSidePopup[StoreKeys.tempSettings]) => ({
    type: ActionType.SET_TEMPSETTINGS,
    payload: { tempSettings },
  }),
}

type ISetTempSettings = {
  type: string
  payload: { tempSettings: IStoreSidePopup[StoreKeys.tempSettings] }
}

export type IActions = ISetTempSettings

export default ActionCreator
