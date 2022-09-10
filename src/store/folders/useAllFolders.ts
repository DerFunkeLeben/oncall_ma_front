import { useSelector } from 'react-redux'
import { getActiveFolderId, getAllFolders, getAllFoldersIds } from './selectors'
import { IState, MainReducerKeys } from 'store/data-types'

const useAllFolders = (reducerName: MainReducerKeys) => {
  const allFolders = useSelector((state: IState) => getAllFolders(state, reducerName))
  const allFoldersIds = useSelector((state: IState) => getAllFoldersIds(state, reducerName))
  const activeFolderId = useSelector((state: IState) => getActiveFolderId(state, reducerName))

  return {
    allFolders,
    allFoldersIds,
    activeFolderId,
  }
}

export default useAllFolders
