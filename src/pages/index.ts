// import { lazy } from 'react'
import { PagesData } from 'constants/url'

import Login from './Login/Login'
import Audience from './Audience/Audience'
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
    Component: Audience,
    ...PagesData.AUDIENCE,
  },
  {
    Component: Content,
    ...PagesData.CONTENT,
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
