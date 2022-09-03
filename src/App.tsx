import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import { Redirect } from 'react-router'

import AlertBox from 'components/AlertBox/AlertBox'
import PAGES from 'pages'
import { AlertContext, INIT_ALERTBOX } from 'context/AlertContext'
// import { PagesData } from 'constants/url'
import './assets/styles/App.scss'
import './assets/styles/typography.scss'
import './assets/styles/fonts.scss'

function App() {
  const [alertBox, setAlertBox] = useState(INIT_ALERTBOX)
  const closeAlertBox = () => setAlertBox(INIT_ALERTBOX)

  return (
    <div className="App">
      <Switch>
        {PAGES.map((page) => {
          const { Component, link, route, ...rest } = page
          return (
            <Route path={route} exact key={link}>
              <AlertContext.Provider value={{ alertBox, setAlertBox }}>
                <Component {...rest} route={route} link={link} />
                <AlertBox {...{ ...alertBox, close: closeAlertBox }} />
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
