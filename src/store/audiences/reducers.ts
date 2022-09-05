import { combineReducers } from 'redux'
import { MainReducerKeys } from 'store/data-types'

import { foldersReducer } from 'store/folders/reducers'
import { IStoreFolder } from 'store/folders/_data-types'

const initialFolderState: IStoreFolder = {
  activeFolderId: '0_audience',
  allFolders: {
    '0_audience': {
      name: 'Все аудитории',
      id: '0_audience',
      count: 1947,
      isMainFolder: true,
    },
    '52a': {
      name: 'Гинекологи',
      id: '52a',
      count: 546,
    },
    '43a': {
      name: 'Онбординг',
      id: '43a',
      count: 262,
    },
    '48a': {
      name: 'Хирурги',
      id: '48a',
      count: 377,
    },
    '34a': {
      name: 'Праздники рассылки',
      id: '34a',
      count: 620,
    },
  },
}

const reducer = combineReducers({
  folders: foldersReducer(MainReducerKeys.audiences),
})

export { reducer, initialFolderState }
