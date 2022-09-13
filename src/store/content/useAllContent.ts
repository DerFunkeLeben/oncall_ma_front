import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { batchActions } from 'redux-batched-actions'
import { MainReducerKeys } from 'store/data-types'
import FoldersActionCreator from 'store/folders/actions'
import ActionCreator from './actions'

import { getAllContent, getContent } from './selectors'

const useAllContent = () => {
  const allContentObj = useSelector(getContent)
  const allContent = useSelector(getAllContent)

  const dispatch = useDispatch()

  const deleteMultipleById = useCallback(
    (ids: string[]) => {
      const folderActions = ids.map((contentId) => {
        const { folderName } = allContentObj[contentId]
        return FoldersActionCreator.decrementFolder(folderName, MainReducerKeys.content)
      })

      dispatch(batchActions([ActionCreator.deleteMultipleById(ids), ...folderActions]))
    },
    [dispatch]
  )

  return {
    allContent,
    deleteMultipleById,
  }
}

export default useAllContent
