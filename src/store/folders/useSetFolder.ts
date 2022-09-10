import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import ActionCreator from './actions'
import { IFolder } from 'types'
import { MainReducerKeys } from 'store/data-types'

const useSetFolders = (reducerName: MainReducerKeys) => {
  const dispatch = useDispatch()

  const viewFolder = useCallback(
    (folderId: string) => {
      dispatch(ActionCreator.viewFolder(folderId, reducerName))
    },
    [dispatch]
  )

  const createFolder = useCallback(
    (folder: IFolder) => {
      dispatch(ActionCreator.createFolder(folder, reducerName))
    },
    [dispatch]
  )

  const renameFolder = useCallback(
    (folder: IFolder) => {
      dispatch(ActionCreator.renameFolder(folder, reducerName))
    },
    [dispatch]
  )

  const deleteFolder = useCallback(
    (folder: IFolder) => {
      dispatch(ActionCreator.deleteFolder(folder, reducerName))
    },
    [dispatch]
  )

  const incrementFolder = useCallback(
    (folderId: string) => {
      dispatch(ActionCreator.incrementFolder(folderId, reducerName))
    },
    [dispatch]
  )

  const decrementFolder = useCallback(
    (folderId: string) => {
      dispatch(ActionCreator.decrementFolder(folderId, reducerName))
    },
    [dispatch]
  )

  return {
    viewFolder,
    createFolder,
    renameFolder,
    deleteFolder,
    incrementFolder,
    decrementFolder,
  }
}

export default useSetFolders
