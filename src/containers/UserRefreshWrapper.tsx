import { useEffect, FC } from 'react'
import { useHistory } from 'react-router-dom'
import useAuth from 'store/auth/useAuth'
import useHandleUserData from 'hooks/useInitData'

import { PagesData } from 'constants/url'
import { IUser } from 'types'

const UserRefreshWrapper: FC = ({ children }) => {
  const { resfreshUserOnLoad } = useAuth()

  const history = useHistory()
  const setInitData = useHandleUserData()

  useEffect(() => {
    const fetchData = async () => {
      const userData: null | IUser = await resfreshUserOnLoad()
      console.log(userData)
      if (!userData?.id) history.push(PagesData.LOGIN.link)
      else await setInitData(userData)
    }

    fetchData()
  }, [])

  return <>{children}</>
}

export default UserRefreshWrapper
