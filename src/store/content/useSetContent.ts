import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { batchActions } from 'redux-batched-actions'

import useSetFolders from 'store/folders/useSetFolder'
import FoldersActionCreator from 'store/folders/actions'
import ActionCreator from './actions'

import { IContent } from 'types/content'
import { MainReducerKeys } from 'store/data-types'

const useSetContent = () => {
  const dispatch = useDispatch()
  const { activeFolderId } = useSetFolders(MainReducerKeys.content)

  const createContent = useCallback(
    (content: IContent) => {
      dispatch(
        batchActions([
          ActionCreator.createContent({ ...content, folderId: activeFolderId }),
          FoldersActionCreator.incrementFolder(activeFolderId, MainReducerKeys.content),
        ])
      )
    },
    [dispatch]
  )

  const saveContent = useCallback(
    (content: IContent) => {
      dispatch(ActionCreator.saveContent(content))
    },
    [dispatch]
  )

  const deleteContent = useCallback(
    (content: IContent) => {
      dispatch(
        batchActions([
          ActionCreator.deleteContent(content),
          FoldersActionCreator.decrementFolder(activeFolderId, MainReducerKeys.content),
        ])
      )
    },
    [dispatch]
  )

  return {
    createContent,
    saveContent,
    deleteContent,
  }
}

export default useSetContent
