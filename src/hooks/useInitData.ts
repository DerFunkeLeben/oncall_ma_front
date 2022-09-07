import { useCallback } from 'react'

import useAuth from 'store/auth/useAuth'

import { getAxiosSingle, postAxiosSingle } from 'utils/axios'
import { IUser } from 'types'

const useInitData = () => {
  const { setUser } = useAuth()

  const setInitData = useCallback(
    async (userData: IUser) => {
      // const { id, email, agency, role, confirmed } = userData

      setUser({ ...userData })
    },
    [setUser]
  )

  return setInitData
}

export default useInitData
