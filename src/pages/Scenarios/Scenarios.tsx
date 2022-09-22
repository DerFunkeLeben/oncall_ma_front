import { FC, useEffect, useState } from 'react'
import cx from 'classnames'
import { Switch, Route, Redirect } from 'react-router-dom'

import CreateScenario from './Scenario/CreateScenario'
import AllContent from './AllScenarios/AllScenarios'
import { PagesData } from 'constants/url'
import Sidebar from 'components/Sidebar/Sidebar'
import { IPageData } from 'types'

import styles from './Scenarios.module.scss'

const SCENARIO_PAGES = [
  {
    Component: AllContent,
    ...PagesData.SCENARIOS,
  },
  {
    Component: CreateScenario,
    ...PagesData.CREATE_SCENARIOS,
  },
  {
    Component: CreateScenario,
    ...PagesData.OPEN_SCENARIOS,
  },
]

const Scenarios: FC<IPageData> = () => {
  return (
    <div className={cx(styles.page)}>
      <Switch>
        {SCENARIO_PAGES.map((page) => {
          const { link, Component, ...rest } = page
          console.log({ page })
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

export default Scenarios
