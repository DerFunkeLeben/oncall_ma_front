// import { lazy } from 'react'
import { PagesData } from 'constants/url'

import Login from './Login/Login'
import Audiences from './Audiences/Audiences'
import Content from './Content/Content'
import Analytics from './Analytics/Analytics'
import Scenarios from './Scenarios/Scenarios'
import Error404 from './404/404'
// const Login = lazy(() => import('./Login/Login'))

const PAGES = [
  {
    Component: Login,
    ...PagesData.LOGIN,
  },
  {
    Component: Audiences,
    ...PagesData.AUDIENCES,
  },
  {
    Component: Content,
    ...PagesData.ALL_CONTENT,
  },
  {
    Component: Analytics,
    ...PagesData.ANALYTICS,
  },
  {
    Component: Scenarios,
    ...PagesData.SCENARIOS,
  },
  {
    Component: Error404,
    ...PagesData.ERROR404,
  },
]

export default PAGES
