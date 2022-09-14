import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ActionCreator from './actions'

import { getAllAudiences } from './selectors'

const useAllAudiences = () => {
  const allAudiences = useSelector(getAllAudiences)
  const dispatch = useDispatch()

  const initAllAudiences = useCallback(
    (data) => {
      dispatch(ActionCreator.initAllAudiences(data))
    },
    [dispatch]
  )

  return {
    allAudiences,
    initAllAudiences,
  }
}

export default useAllAudiences
