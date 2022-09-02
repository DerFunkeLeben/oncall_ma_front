import { useSelector } from 'react-redux'

import { getAllFolders, getAllFoldersIds } from 'store/content/selectors'
// TODO импортить другие селекторы и по условию запускать их в useSelector

const useAllFolders = () => {
  const allFolders = useSelector(getAllFolders)
  const allFoldersIds = useSelector(getAllFoldersIds)

  return {
    allFolders,
    allFoldersIds,
  }
}

export default useAllFolders
