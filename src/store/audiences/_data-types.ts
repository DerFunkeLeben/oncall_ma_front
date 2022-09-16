import { AudienceAction } from 'constants/audience'

import { IAudienceMetaData } from 'types/audience'

export enum StoreKeys {
  allAudiences = 'allAudiences',
  currentAudience = 'currentAudience',
}

export interface IStoreAudiences {
  [StoreKeys.allAudiences]: { [key: string]: IAudienceMetaData }
  [StoreKeys.currentAudience]: {
    audience: IAudienceMetaData
    action: AudienceAction
  }
}
