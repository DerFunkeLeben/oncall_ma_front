import { FC } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { useAuth } from 'store/auth/useAuth'
import useDidUpdateEffect from 'hooks/useDidUpdateEffect'

import { PagesData } from 'constants/url'

const LocationChangeWrapper: FC = ({ children }) => {
  const { user } = useAuth()

  const history = useHistory()
  const location = useLocation()

  useDidUpdateEffect(() => {
    if (history.location.pathname === PagesData.LOGIN.link) return
    if (!user?.email) return history.push(PagesData.LOGIN.link)
  }, [location])

  return <>{children}</>
}

export default LocationChangeWrapper
