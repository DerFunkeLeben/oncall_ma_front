import { combineReducers } from 'redux'
import { MainReducerKeys } from 'store/data-types'

import { foldersReducer } from 'store/folders/reducers'
import { IStoreFolder } from 'store/folders/_data-types'

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

const reducer = combineReducers({
  folders: foldersReducer(MainReducerKeys.audiences),
})

export { reducer, initialFolderState }
