import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Redirect } from 'react-router'

import AlertBox from 'components/AlertBox/AlertBox'
import MessageBox from 'components/MessageBox/MessageBox'

import PAGES from 'pages'

import { useAuth } from 'store/auth/useAuth'
import { useAlertBox } from 'hooks/useAlertBox'
import { useMessageBox } from 'hooks/useMessageBox'
import { AlertContext } from 'context/AlertContext'
import { MessageBoxContext } from 'context/MessageBoxContext'
// import { PagesData } from 'constants/url'
import './assets/styles/App.scss'
import './assets/styles/typography.scss'
import './assets/styles/fonts.scss'

function App() {
  const alertBox = useAlertBox()
  const messageBox = useMessageBox()

  return (
    <div className="App">
      <Switch>
        {PAGES.map((page) => {
          const { Component, link, route, ...rest } = page
          return (
            <Route path={route} exact key={link}>
              <AlertContext.Provider value={alertBox}>
                <MessageBoxContext.Provider value={messageBox}>
                  <Component {...rest} route={route} link={link} />
                  <AlertBox />
                  <MessageBox />
                </MessageBoxContext.Provider>
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
