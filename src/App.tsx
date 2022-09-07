import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Redirect } from 'react-router'

import AlertBox from 'components/AlertBox/AlertBox'
import MessageBox from 'components/MessageBox/MessageBox'
import HashChangeWrapper from 'containers/LocationChangeWrapper'
import UserRefreshWrapper from 'containers/UserRefreshWrapper'

import PAGES from 'pages'

import { useAlertBox } from 'hooks/useAlertBox'
import { useMessageBox } from 'hooks/useMessageBox'
import { AlertContext } from 'context/AlertContext'
import { MessageBoxContext } from 'context/MessageBoxContext'

import './assets/styles/App.scss'
import './assets/styles/typography.scss'
import './assets/styles/fonts.scss'

function App() {
  const alertBox = useAlertBox()
  const messageBox = useMessageBox()

  return (
    <div className="App">
      <HashChangeWrapper>
        <UserRefreshWrapper>
          <AlertContext.Provider value={alertBox}>
            <MessageBoxContext.Provider value={messageBox}>
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
              <AlertBox />
              <MessageBox />
            </MessageBoxContext.Provider>
          </AlertContext.Provider>
        </UserRefreshWrapper>
      </HashChangeWrapper>
    </div>
  )
}

export default App
