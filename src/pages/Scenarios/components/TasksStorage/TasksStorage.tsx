import { FC, useEffect, useRef, useState } from 'react'
import cx from 'classnames'

import Task from '../Task/Task'

import styles from './TasksStorage.module.scss'

import { TasksTypes, TaskStorageFolders, TasksDefaultNames } from 'types'

const {
  list,
  event,
  email,
  sms,
  telegram,
  push,
  condition,
  wait,
  join,
  ab_test,
  assignment,
  crm_message,
} = TasksTypes

const { scenario_creation, communication, scenarios } = TaskStorageFolders

const taskStorage = [
  { title: scenario_creation, tasks: [list, event], color: 'orange' },
  { title: communication, tasks: [email, sms, telegram, push], color: 'cyan' },
  {
    title: scenarios,
    tasks: [condition, wait, join, ab_test, assignment, crm_message],
    color: 'pink',
  },
]

const TasksStorage: FC = () => {
  return (
    <div className={styles.tasksStorage}>
      {taskStorage.map((group, indexG) => {
        const { title, tasks, color } = group
        return (
          <div className={styles.groupOfTasks} key={indexG}>
            <p className={cx(styles.title, 'text_2_hl_1')}>{title}</p>
            <div className={styles.tasks}>
              {tasks.map((task, indexA) => {
                const properties = {
                  type: task,
                  color,
                  status: 'validated',
                  name: TasksDefaultNames[task],
                }
                return (
                  <div key={indexA} className={styles.taskContainer}>
                    <Task properties={properties}></Task>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TasksStorage
