import { FC, useEffect, useRef, useState } from 'react'
import cx from 'classnames'

import Task from '../Task/Task'

import styles from './TasksStorage.module.scss'

import { TasksTypes } from 'types'

const taskStorage = [
  { title: 'Создание сценария', tasks: ['Список', 'Событие'] },
  { title: 'Коммуникация', tasks: ['Email', 'SMS', 'Telegram', 'Push-уведомления'] },
  {
    title: 'Сценарии',
    tasks: [
      'Условие',
      'Ожидание',
      'Объединение',
      'А/Б тест',
      'Присвоение атрибута',
      'CRM сообщение',
    ],
  },
]
export const dictionary = {
  sms: 'Sms',
  email: 'Письмо',
  condition: 'Условие',
  wait: 'Ожидание',
  push: 'Push уведомление',
  join: 'Объединение',
  crm_message: 'CRM сообщение',
  telegram: 'Telegram',
  ab_test: 'А/Б тест',
  assignment: 'Присвоение',
}

const TasksStorage: FC = () => {
  return (
    <div className={styles.tasksStorage}>
      {taskStorage.map((group, indexG) => {
        const { title, tasks } = group
        return (
          <div className={styles.groupOfTasks} key={indexG}>
            <p className={cx(styles.title, 'text_2_hl_1')}>{title}</p>
            <div className={styles.tasks}>
              {tasks.map((task, indexA) => {
                const properties = { type: task }
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
