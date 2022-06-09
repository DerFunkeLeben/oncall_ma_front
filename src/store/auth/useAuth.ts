import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import ActionCreator from './actions'
import { getUser } from './selectors'

import { IStoreAuth, StoreKeys } from './_data-types'
import { IUser } from 'types'

const useAuth = () => {
  const dispatch = useDispatch()

  const user = useSelector(getUser) as IUser

  const setUser = useCallback(
    (useData: IStoreAuth[StoreKeys.user]) => {
      dispatch(ActionCreator.setUser(useData))
    },
    [dispatch]
  )

  return {
    user,
    setUser,
  }
}

export { useAuth }
