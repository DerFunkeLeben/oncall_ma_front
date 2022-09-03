import { useSelector } from 'react-redux'

import { getAllFolders, getAllFoldersIds } from 'store/content/selectors'
// TODO импортить другие селекторы и по условию запускать их в useSelector
// или добавить параметр в селектор -  на какой странице обрабатываем папки

const useAllFolders = () => {
  const allFolders = useSelector(getAllFolders)
  const allFoldersIds = useSelector(getAllFoldersIds)

  return {
    allFolders,
    allFoldersIds,
  }
}

export default useAllFolders
