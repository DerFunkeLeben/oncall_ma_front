import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ActionCreator from './actions'
import { getCurrentFolder } from 'store/content/selectors'
import { IFolder } from 'types'
import { IStoreFolder, StoreKeys } from './_data-types'

const useSetFolders = () => {
  const dispatch = useDispatch()

  const currentFolder = useSelector(getCurrentFolder)

  const viewFolder = useCallback(
    (folder: IStoreFolder[StoreKeys.currentFolder]) => {
      dispatch(ActionCreator.viewFolder(folder))
    },
    [dispatch]
  )

  const createFolder = useCallback(
    (folder: IFolder) => {
      dispatch(ActionCreator.createFolder(folder))
    },
    [dispatch]
  )

  return {
    currentFolder,
    viewFolder,
    createFolder,
  }
}

export default useSetFolders
