import { FC } from 'react'
import cx from 'classnames'
import { Switch, Route, Redirect } from 'react-router-dom'

import Sidebar from 'components/Sidebar/Sidebar'
import { IPageData } from 'types'

import AllAudiences from './AllAudiences/AllAudiences'
import OneAudience from './OneAudience/OneAudience'
import CreateAudience from './CreateAudience/CreateAudience'
import { PagesData } from 'constants/url'

import styles from './Audiences.module.scss'

const AUDIENCE_PAGES = [
  {
    Component: AllAudiences,
    ...PagesData.AUDIENCES,
  },
  {
    Component: CreateAudience,
    ...PagesData.CREATE_AUDIENCE,
  },
  {
    Component: OneAudience,
    ...PagesData.AUDIENCE,
  },
]

const Audiences: FC<IPageData> = () => {
  return (
    <div className={cx(styles.page)}>
      <Switch>
        {AUDIENCE_PAGES.map((page) => {
          const { link, Component, ...rest } = page
          return (
            <Route exact path={link} key={link}>
              <Sidebar />
              <Component {...rest} link={link} />
            </Route>
          )
        })}
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  )
}

export default Audiences
