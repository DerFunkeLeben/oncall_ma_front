import { IState } from '../data-types'
import { StoreKeys, IStoreContent } from './_data-types'

const getAllContent = (state: IState): IStoreContent[StoreKeys.allContent] =>
  state.content.allContent

const getCurrentContent = (state: IState): IStoreContent[StoreKeys.currentContent] =>
  state.content[StoreKeys.currentContent]

export { getAllContent, getCurrentContent }
