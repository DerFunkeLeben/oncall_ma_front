import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ActionCreator from './actions'
import { IFolder } from 'types'
import { getActiveFolderId } from 'store/content/selectors'

const useSetFolders = () => {
  const dispatch = useDispatch()

  const activeFolderId = useSelector(getActiveFolderId)

  const viewFolder = useCallback(
    (folderId: string) => {
      dispatch(ActionCreator.viewFolder(folderId))
    },
    [dispatch]
  )

  const createFolder = useCallback(
    (folder: IFolder) => {
      dispatch(ActionCreator.createFolder(folder))
    },
    [dispatch]
  )

  const renameFolder = useCallback(
    (folder: IFolder) => {
      dispatch(ActionCreator.renameFolder(folder))
    },
    [dispatch]
  )

  const deleteFolder = useCallback(
    (folder: IFolder) => {
      dispatch(ActionCreator.deleteFolder(folder))
    },
    [dispatch]
  )

  return {
    activeFolderId,
    viewFolder,
    createFolder,
    renameFolder,
    deleteFolder,
  }
}

export default useSetFolders
