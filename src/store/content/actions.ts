import ActionType from './action-type'
import { IStoreContent, StoreKeys } from './_data-types'

const ActionCreator = {
  setCurrentContent: (content: IStoreContent[StoreKeys.currentContent]) => ({
    type: ActionType.SET_CURRENT_CONTENT,
    payload: content,
  }),
}

export default ActionCreator
