import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IStoreContent, StoreKeys } from './_data-types'
import ActionCreator from './actions'

import { getCurrentContent } from './selectors'

const useCurrentContent = () => {
  const dispatch = useDispatch()

  const currentContent = useSelector(getCurrentContent)

  const setCurrentContent = useCallback(
    (content: IStoreContent[StoreKeys.currentContent]) => {
      dispatch(ActionCreator.setCurrentContent(content))
    },
    [dispatch]
  )

  return {
    currentContent,
    setCurrentContent,
  }
}

export default useCurrentContent
