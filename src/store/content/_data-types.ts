import { ContentAction } from 'constants/content'
import { IContent } from 'types/content'

export enum StoreKeys {
  allContent = 'allContent',
  currentContent = 'currentContent',
}

export interface IStoreContent {
  [StoreKeys.allContent]: { [key: string]: IContent }
  [StoreKeys.currentContent]: {
    content: IContent | undefined
    contentAction: ContentAction
  }
}
