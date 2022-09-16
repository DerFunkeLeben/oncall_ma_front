import { IAudienceMetaData } from 'types/audience'
import ActionType from './action-type'
import { IStoreAudiences, StoreKeys } from './_data-types'

const ActionCreator = {
  setCurrentAudience: (aud: IStoreAudiences[StoreKeys.currentAudience]) => ({
    type: ActionType.SET_CURRENT_AUDIENCE,
    payload: aud,
  }),
  updateAudienceInfo: (aud: IAudienceMetaData) => ({
    type: ActionType.UPDATE_AUDIENCE_INFO,
    payload: aud,
  }),
  initAllAudiences: (aud: IAudienceMetaData[]) => ({
    type: ActionType.INIT_ALL_AUDIENCES,
    payload: aud,
  }),
}

export default ActionCreator
