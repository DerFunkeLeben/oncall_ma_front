import { useSelector } from 'react-redux'

import { getAllContent } from './selectors'

const useAllContent = () => {
  const allContent = useSelector(getAllContent)

  return {
    allContent,
  }
}

export default useAllContent
