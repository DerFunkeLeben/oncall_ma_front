import { IContent } from 'types/content'
import ActionType from './action-type'
import { IStoreContent, StoreKeys } from './_data-types'

const ActionCreator = {
  setCurrentContent: (content: IStoreContent[StoreKeys.currentContent]) => ({
    type: ActionType.SET_CURRENT_CONTENT,
    payload: content,
  }),
  createContent: (content: IContent) => ({
    type: ActionType.CREATE_CONTENT,
    payload: content,
  }),
  saveContent: (content: IContent) => ({
    type: ActionType.SAVE_CONTENT,
    payload: content,
  }),
  deleteContent: (content: IContent) => ({
    type: ActionType.DELETE_CONTENT,
    payload: content,
  }),
  deleteMultipleById: (ids: string[]) => ({
    type: ActionType.DELETE_MULTIPLE,
    payload: ids,
  }),
}

export default ActionCreator
