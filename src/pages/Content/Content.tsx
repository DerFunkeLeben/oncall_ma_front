import { FC, useState } from 'react'
import cx from 'classnames'
import { Switch, Route, Redirect } from 'react-router-dom'

import AlertBox from 'components/AlertBox/AlertBox'
import Sidebar from 'components/Sidebar/Sidebar'
import AllContent from './AllContent/AllContent'
import ContentHTML from './ContentHTML/ContentHTML'
import ContentSMS from './ContentSMS/ContentSMS'

import { AlertContext, INIT_ALERTBOX } from 'context/AlertContext'
import { PagesData } from 'constants/url'
import { IPageData } from 'types'

import styles from './Content.module.scss'

const CONTENT_PAGES = [
  {
    Component: AllContent,
    ...PagesData.ALL_CONTENT,
  },
  {
    Component: ContentHTML,
    ...PagesData.CONTENT_HTML,
  },
  {
    Component: ContentSMS,
    ...PagesData.CONTENT_SMS,
  },
  {
    Component: ContentHTML,
    ...PagesData.CONTENT_HTML_VIEW,
  },
  {
    Component: ContentSMS,
    ...PagesData.CONTENT_SMS_VIEW,
  },
]

const Content: FC<IPageData> = () => {
  // TODO: это надо переносить наверх
  const [alertBox, setAlertBox] = useState(INIT_ALERTBOX)
  const closeAlertBox = () => setAlertBox(INIT_ALERTBOX)

  return (
    <div className={cx(styles.page)}>
      <Switch>
        {CONTENT_PAGES.map((page) => {
          const { link, Component, ...rest } = page
          return (
            <Route exact path={link} key={link}>
              <AlertContext.Provider value={{ alertBox, setAlertBox }}>
                <Sidebar />
                <Component {...rest} link={link} />
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

export default Content
