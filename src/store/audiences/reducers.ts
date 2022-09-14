import { AudienceAction } from 'constants/audience'
import { combineReducers } from 'redux'
import { IReducer, MainReducerKeys } from 'store/data-types'

import { foldersReducer } from 'store/folders/reducers'
import { IStoreFolder } from 'store/folders/_data-types'
import { IAudienceMetaData } from 'types/audience'
import ActionType from './action-type'
import { IStoreAudiences, StoreKeys } from './_data-types'

const initialAudienceState: IStoreAudiences = {
  allAudiences: {},
  currentAudience: {
    audience: undefined,
    action: AudienceAction.CREATE_CRM,
  },
}

const initialFolderState: IStoreFolder = {
  activeFolderName: 'Все аудитории',
  mainFolderName: 'Все аудитории',
  allFolders: {
    'Все аудитории': {
      name: 'Все аудитории',
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
    case ActionType.INIT_ALL_AUDIENCES: {
      const newAudiences = {} as { [key: string]: IAudienceMetaData }

      payload?.map((aud: IAudienceMetaData) => {
        newAudiences[aud.id] = aud
      })

      return {
        ...state,
        [StoreKeys.allAudiences]: newAudiences,
      }
    }

    case ActionType.SET_CURRENT_AUDIENCE:
      return {
        ...state,
        [StoreKeys.currentAudience]: payload,
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
