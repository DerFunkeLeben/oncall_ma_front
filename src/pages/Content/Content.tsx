import { FC } from 'react'
import cx from 'classnames'
import { Switch, Route, Redirect } from 'react-router-dom'

import Sidebar from 'components/Sidebar/Sidebar'
import AllContent from './AllContent/AllContent'

import { PagesData } from 'constants/url'
import { IPageData } from 'types'

import styles from './Content.module.scss'

const CONTENT_PAGES = [
  {
    Component: AllContent,
    ...PagesData.CONTENT,
  },
]

const Content: FC<IPageData> = () => {
  return (
    <div className={cx(styles.page)}>
      <Switch>
        {CONTENT_PAGES.map((page) => {
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

export default Content
