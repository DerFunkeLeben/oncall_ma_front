import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'

import App from './App'
import AppWrapper from './AppWrapper'

import './assets/styles/index.scss'

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <AppWrapper>
        <App />
      </AppWrapper>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
