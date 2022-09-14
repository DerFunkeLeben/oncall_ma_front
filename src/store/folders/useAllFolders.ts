import { useDispatch, useSelector } from 'react-redux'
import {
  getActiveFolderName,
  getAllFolders,
  getAllFoldersNames,
  getMainFolderName,
} from './selectors'
import { IState, MainReducerKeys } from 'store/data-types'
import { useCallback } from 'react'
import ActionCreator from './actions'

const useAllFolders = (reducerName: MainReducerKeys) => {
  const allFolders = useSelector((state: IState) => getAllFolders(state, reducerName))
  const allFoldersIds = useSelector((state: IState) => getAllFoldersNames(state, reducerName))
  const activeFolderName = useSelector((state: IState) => getActiveFolderName(state, reducerName))
  const mainFolderName = useSelector((state: IState) => getMainFolderName(state, reducerName))

  const dispatch = useDispatch()

  const initFolders = useCallback(
    (data: any[]) => {
      dispatch(ActionCreator.initFolders(data, reducerName))
    },
    [dispatch]
  )

  return {
    allFolders,
    allFoldersIds,
    activeFolderName,
    initFolders,
    mainFolderName,
  }
}

export const useAudienceFolders = () => useAllFolders(MainReducerKeys.audiences)
export const useContentFolders = () => useAllFolders(MainReducerKeys.content)

export default useAllFolders
