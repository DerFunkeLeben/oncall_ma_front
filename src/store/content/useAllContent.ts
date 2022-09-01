import { useSelector } from 'react-redux'

import { getAllContent, getAllContentIds } from './selectors'

const useAllContent = () => {
  const allContent = useSelector(getAllContent)
  const allContentIds = useSelector(getAllContentIds)

  return {
    allContent,
    allContentIds,
  }
}

export default useAllContent
