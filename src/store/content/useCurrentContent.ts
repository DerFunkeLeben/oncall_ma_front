import { useParams } from 'react-router-dom'

import useParamSelector from 'hooks/useParamSelector'
import { ContentAction } from 'constants/content'
import { getContentById } from './selectors'

const { CREATE, EDIT } = ContentAction

const useCurrentContent = () => {
  const { contentId } = useParams<{ contentId?: string }>()

  const content = useParamSelector(getContentById, contentId)

  let currentContent
  if (content) currentContent = { content, contentAction: EDIT }
  else currentContent = { content, contentAction: CREATE }

  return { currentContent }
}

export default useCurrentContent
