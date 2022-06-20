import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Redirect } from 'react-router'

import PAGES from 'pages'

// import { PagesData } from 'constants/url'
import './assets/styles/App.scss'
import './assets/styles/text_styles.scss'
import './assets/styles/fonts.scss'

function App() {
  return (
    <div className="App">
      <Switch>
        {PAGES.map((page) => {
          const { Component, link, route, ...rest } = page
          return (
            <Route path={route} exact key={link}>
              <Component {...rest} route={route} link={link} />
            </Route>
          )
        })}
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  )
}

export default App
