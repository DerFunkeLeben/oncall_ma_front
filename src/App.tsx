import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Redirect } from 'react-router'

import AlertBox from 'components/AlertBox/AlertBox'
import PAGES from 'pages'

import { useAuth } from 'store/auth/useAuth'
import { AlertContext, useAlertBox } from 'context/AlertContext'
// import { PagesData } from 'constants/url'
import './assets/styles/App.scss'
import './assets/styles/typography.scss'
import './assets/styles/fonts.scss'

function App() {
  const { alertBox, setAlertBox, hideAlertBox } = useAlertBox()

  return (
    <div className="App">
      <Switch>
        {PAGES.map((page) => {
          const { Component, link, route, ...rest } = page
          return (
            <Route path={route} exact key={link}>
              <AlertContext.Provider value={{ setAlertBox }}>
                <Component {...rest} route={route} link={link} />
                <AlertBox {...{ ...alertBox, close: hideAlertBox }} />
              </AlertContext.Provider>
            </Route>
          )
        })}
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  )
}

export default App
