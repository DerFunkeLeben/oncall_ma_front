import ActionType from './action-type'
import { IStoreSidePopup, StoreKeys } from './_data-types'

const ActionCreator = {
  setTempSettings: (tempSettings: IStoreSidePopup[StoreKeys.tempSettings]) => {
    return {
      type: ActionType.SET_TEMPSETTINGS,
      payload: { tempSettings },
    }
  },
  setStep: (stepNumber: IStoreSidePopup[StoreKeys.stepNumber]) => ({
    type: ActionType.SET_STEP,
    payload: { stepNumber },
  }),
}

type ISetTempSettings = {
  type: string
  payload: { tempSettings: IStoreSidePopup[StoreKeys.tempSettings] }
}

type ISetStep = {
  type: string
  payload: { stepNumber: IStoreSidePopup[StoreKeys.stepNumber] }
}

export type IActions = ISetTempSettings | ISetStep

export default ActionCreator
