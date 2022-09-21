import { combineReducers } from 'redux'
import { v4 as uuid } from 'uuid'

import { ContentAction } from 'constants/content'
import { foldersReducer } from 'store/folders/reducers'
import { IStoreFolder } from 'store/folders/_data-types'

import ActionType from './action-type'
import { IStoreContent, StoreKeys } from './_data-types'
import { MainReducerKeys } from 'store/data-types'

import { IReducer } from '../data-types'

const initialContentState: IStoreContent = {
  allContent: {},

  currentContent: {
    content: undefined,
    contentAction: ContentAction.CREATE,
  },
}

const mainFolder = 'Весь контент'
const initialFolderState: IStoreFolder = {
  activeFolderName: mainFolder,
  mainFolderName: mainFolder,
  allFolders: {
    mainFolder: {
      name: mainFolder,
      count: 0,
      isMainFolder: true,
    },
  },
}

const contentReducer = (
  state = initialContentState,
  { type, payload }: IReducer
): IStoreContent => {
  switch (type) {
    case ActionType.SET_CURRENT_CONTENT:
      return {
        ...state,
        [StoreKeys.currentContent]: payload,
      }

    case ActionType.CREATE_CONTENT: {
      const id = uuid()
      const today = new Date()
      const newContent = {
        ...payload,
        id,
        createDate: today,
        lastUpdateDate: today,
      }
      return {
        ...state,
        [StoreKeys.currentContent]: initialContentState.currentContent,
        [StoreKeys.allContent]: { ...state.allContent, [id]: newContent },
      }
    }

    case ActionType.SAVE_CONTENT: {
      const today = new Date()
      const newContent = {
        ...payload,
        lastUpdateDate: today,
      }
      return {
        ...state,
        [StoreKeys.currentContent]: initialContentState.currentContent,
        [StoreKeys.allContent]: { ...state.allContent, [payload.id]: newContent },
      }
    }

    case ActionType.DELETE_CONTENT: {
      const { [payload.id]: _, ...otherContent } = state.allContent
      return {
        ...state,
        [StoreKeys.currentContent]: initialContentState.currentContent,
        [StoreKeys.allContent]: otherContent,
      }
    }

    case ActionType.DELETE_MULTIPLE: {
      const allContentKeys = Object.keys(state.allContent)

      const filteredContent = allContentKeys.reduce((acc, key) => {
        const content = state.allContent[key]
        if (payload.includes(key)) return acc
        return { ...acc, [key]: content }
      }, {})

      return {
        ...state,
        [StoreKeys.allContent]: filteredContent,
      }
    }

    default:
      return state
  }
}

const reducer = combineReducers({
  data: contentReducer,
  folders: foldersReducer(MainReducerKeys.content),
})

export { reducer, initialContentState, initialFolderState }
