import { FC, useEffect, useRef, useState } from 'react'
import cx from 'classnames'

import styles from './ActionsStorage.module.scss'

const actionStorage = [
  { title: 'Создание сценария', actions: ['Список', 'Событие'] },
  { title: 'Коммуникация', actions: ['Email', 'SMS', 'Telegramm', 'Push-уведомления'] },
  {
    title: 'Сценарии',
    actions: [
      'Условие',
      'Ожидание',
      'Объединение',
      'А/Б тест',
      'Присвоение атрибута',
      'CRM сообщение',
    ],
  },
]

const ActionsStorage: FC = () => {
  return (
    <div className={styles.actionsStorage}>
      {actionStorage.map((group, indexG) => {
        const { title, actions } = group
        return (
          <div className={styles.groupOfActions} key={indexG}>
            <p className={cx(styles.title, 'text_2_hl_1')}>{title}</p>
            <div className={styles.actions}>
              {actions.map((action, indexA) => {
                return <div key={indexA}>{action}</div>
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ActionsStorage
