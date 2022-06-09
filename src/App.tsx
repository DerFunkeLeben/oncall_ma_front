import React from 'react'
import { Switch, Route } from 'react-router-dom'

import PAGES from 'pages'

// import { PagesData } from 'constants/url'
import './assets/styles/App.scss'
import './assets/styles/fonts.scss'

function App() {
  return (
    <div className="App">
      <Switch>
        {PAGES.map((page) => {
          const { Component, link } = page
          return (
            <Route path={link} exact key={link}>
              <Component />
            </Route>
          )
        })}
      </Switch>
    </div>
  )
}

export default App
