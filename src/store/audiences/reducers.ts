import { AudienceAction, INIT_AUDIENCE } from 'constants/audience'
import { combineReducers } from 'redux'
import { IReducer, MainReducerKeys } from 'store/data-types'

import { foldersReducer } from 'store/folders/reducers'
import { IStoreFolder } from 'store/folders/_data-types'
import { IAudienceMetaData } from 'types/audience'
import ActionType from './action-type'
import { IStoreAudiences, StoreKeys } from './_data-types'

const initialAudienceState: IStoreAudiences = {
  currentAudience: {
    audience: INIT_AUDIENCE,
    action: AudienceAction.CREATE_CRM,
  },
}
const mainFolder = 'Все аудитории'
const initialFolderState: IStoreFolder = {
  activeFolderName: mainFolder,
  mainFolderName: mainFolder,
  allFolders: {
    [mainFolder]: {
      name: mainFolder,
      count: 0,
      isMainFolder: true,
    },
  },
}

const audienceReducer = (
  state = initialAudienceState,
  { type, payload }: IReducer
): IStoreAudiences => {
  switch (type) {
    case ActionType.SET_CURRENT_AUDIENCE:
      return {
        ...state,
        [StoreKeys.currentAudience]: payload,
      }

    case ActionType.UPDATE_AUDIENCE_INFO:
      return {
        ...state,
        [StoreKeys.currentAudience]: {
          ...state.currentAudience,
          audience: {
            ...state.currentAudience.audience,
            ...payload,
          },
        },
      }

    default:
      return state
  }
}

const reducer = combineReducers({
  data: audienceReducer,
  folders: foldersReducer(MainReducerKeys.audiences),
})

export { reducer, initialAudienceState, initialFolderState }
