import { AudienceAction } from 'constants/audience'

import { IAudienceMetaData } from 'types/audience'

export enum StoreKeys {
  currentAudience = 'currentAudience',
}

export interface IStoreAudiences {
  [StoreKeys.currentAudience]: {
    audience: IAudienceMetaData
    action: AudienceAction
  }
}
