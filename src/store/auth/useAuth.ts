import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import ActionCreator from './actions'
import { getUser } from './selectors'

import { IStoreAuth, StoreKeys } from './_data-types'
import { IUser } from 'types'
import { getAxiosSingle } from 'utils/axios'
import { AUTH_URL_RELOGIN } from 'constants/url'

const useAuth = () => {
  const dispatch = useDispatch()

  const user = useSelector(getUser) as IUser

  const setUser = useCallback(
    (userData: IStoreAuth[StoreKeys.user]) => {
      dispatch(ActionCreator.setUser(userData))
    },
    [dispatch]
  )

  const resfreshUserOnLoad = useCallback(async () => {
    const result = await getAxiosSingle(AUTH_URL_RELOGIN)
    if (result?.response?.status === 403 || !result) {
      // TODO внятная обработка ошибок
      return null
    } else {
      return result
    }
  }, [dispatch])

  return {
    user,
    setUser,
    resfreshUserOnLoad,
  }
}

export default useAuth
