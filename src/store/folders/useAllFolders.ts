import { useSelector } from 'react-redux'
import { getAllFolders, getAllFoldersIds } from './selectors'
import { IState, MainReducerKeys } from 'store/data-types'

const useAllFolders = (reducerName: MainReducerKeys) => {
  const allFolders = useSelector((state: IState) => getAllFolders(state, reducerName))
  const allFoldersIds = useSelector((state: IState) => getAllFoldersIds(state, reducerName))

  return {
    allFolders,
    allFoldersIds,
  }
}

export default useAllFolders
