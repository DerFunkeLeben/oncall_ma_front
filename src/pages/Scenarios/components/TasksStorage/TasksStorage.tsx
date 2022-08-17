import { FC, useEffect, useRef, useState } from 'react'
import cx from 'classnames'

import Task from '../Task/Task'

import styles from './TasksStorage.module.scss'

const taskStorage = [
  { title: 'Создание сценария', tasks: ['Список', 'Событие'] },
  { title: 'Коммуникация', tasks: ['Email', 'SMS', 'Telegramm', 'Push-уведомления'] },
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
                return <Task key={indexA} name={task} type={task}></Task>
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default TasksStorage
