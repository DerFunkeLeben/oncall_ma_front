import { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import ActionCreator from './actions'
import { getAuthData, getUser } from './selectors'

import { IAuthData, IStoreAuth, StoreKeys } from './_data-types'
import { IUser } from 'types'
import { getAxiosSingle } from 'utils/axios'
import { AUTH_URL_RELOGIN } from 'constants/url'

const useAuth = () => {
  const dispatch = useDispatch()

  const user = useSelector(getUser) as IUser
  const authData = useSelector(getAuthData)

  const setAuthData = useCallback(
    (data: IAuthData) => {
      dispatch(ActionCreator.setAuthData(data))
    },
    [dispatch]
  )

  const setUser = useCallback(
    (userData: IStoreAuth[StoreKeys.user]) => {
      dispatch(ActionCreator.setUser(userData))
    },
    [dispatch]
  )

  const resfreshUserOnLoad = useCallback(async () => {
    const nestResult = await getAxiosSingle(AUTH_URL_RELOGIN)
    console.log(nestResult)
    if (nestResult?.response?.status === 403 || !nestResult) {
      // TODO внятная обработка ошибок
      return null
    } else {
      const { user: userDB, token } = nestResult
      setAuthData({ accessToken: token })
      return userDB
    }
  }, [dispatch])

  return {
    user,
    authData,
    setUser,
    setAuthData,
    resfreshUserOnLoad,
  }
}

export default useAuth
