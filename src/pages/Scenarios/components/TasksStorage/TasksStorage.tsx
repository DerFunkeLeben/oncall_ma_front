import { FC, useEffect, useRef, useState } from 'react'
import cx from 'classnames'

import Task from '../Task/Task'

import styles from './TasksStorage.module.scss'

import { TasksTypes, TaskStorageFolders, TasksDefaultNames } from 'types'

const {
  email,
  sms,
  telegram,
  condition,
  wait,
  ab_test,
  crm_message,
  push,
  assignment,
  join,
  finish,
  start,
} = TasksTypes

const { scenario_creation, communication, scenarios } = TaskStorageFolders

const taskStorage = [
  // { title: scenario_creation, tasks: [list, event], color: 'orange' },
  { title: communication, tasks: [email, sms, telegram, push, assignment], color: 'cyan' },
  {
    title: scenarios,
    tasks: [condition, wait, ab_test, crm_message, join],
    color: 'pink',
  },
]

const avaliableTasks = [condition, wait, email, finish, start]

const isAvaliable = (task: TasksTypes) => {
  return avaliableTasks.includes(task)
}

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
                  available: isAvaliable(task),
                  placed: false,
                  properties: {},
                }
                return (
                  <div key={indexA} className={styles.taskContainer}>
                    <Task settings={properties}></Task>
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
