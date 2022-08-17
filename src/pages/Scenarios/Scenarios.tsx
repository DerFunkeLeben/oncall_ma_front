import { FC, useEffect, useState } from 'react'
import cx from 'classnames'

import Sidebar from 'components/Sidebar/Sidebar'
import PageHead from 'components/PageHead/PageHead'
import ScenarioBuilder from 'pages/Scenarios/components/ScenarioBuilder/ScenarioBuilder'

import styles from './Scenarios.module.scss'
import Field from './components/Field/Field'
import TasksStorage from './components/TasksStorage/TasksStorage'

const Scenarios: FC = () => {
  return (
    <div className={cx(styles.page)}>
      <Sidebar />
      <div className={cx(styles.pageContent)}>
        <PageHead title="Сценарии" />
        <TasksStorage />
        <ScenarioBuilder />
      </div>
    </div>
  )
}

export default Scenarios
