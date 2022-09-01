import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import ActionCreator from './actions'

import { IContent } from 'types/content'

const useSetContent = () => {
  const dispatch = useDispatch()

  const createContent = useCallback(
    (content: IContent) => {
      dispatch(ActionCreator.createContent(content))
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
      dispatch(ActionCreator.deleteContent(content))
    },
    [dispatch]
  )

  const deleteMultipleById = useCallback(
    (ids: string[]) => {
      dispatch(ActionCreator.deleteMultipleById(ids))
    },
    [dispatch]
  )

  return {
    createContent,
    saveContent,
    deleteContent,
    deleteMultipleById,
  }
}

export default useSetContent
