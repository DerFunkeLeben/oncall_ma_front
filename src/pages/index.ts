// import { lazy } from 'react'
import { PagesData } from 'constants/url'

import Login from './Login/Login'
import Audiences from './Audiences/Audiences'
import Content from './Content/Content'
import Analytics from './Analytics/Analytics'
import Scenarios from './Scenarios/Scenarios'
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
]

export default PAGES
