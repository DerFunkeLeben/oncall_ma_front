import { FC } from 'react'
import { ITaskIcon } from '../../../type'
import cx from 'classnames'

import styles from './TaskIcon.module.scss'

import {
  IconTaskAbTest,
  IconTaskAssigment,
  IconTaskCrmMessage,
  IconTaskEmail,
  IconTaskEvent,
  IconTaskExit,
  IconTaskJoin,
  IconTaskList,
  IconTaskPush,
  IconTaskQuestion,
  IconTaskSms,
  IconTaskTelega,
  IconTaskWait,
} from 'assets/icons'

const TaskIcon: FC<ITaskIcon> = ({ type, status, color }) => {
  //чет насрано

  const taskIcons = {
    list: <IconTaskList className={cx(styles.iconRomb)} />,
    event: <IconTaskEvent className={cx(styles.iconRomb)} />,
    email: <IconTaskEmail className={cx(styles[color])} data-status={status} />,
    sms: <IconTaskSms className={cx(styles[color])} data-status={status} />,
    telegram: <IconTaskTelega className={cx(styles[color])} data-status={status} />,
    push: <IconTaskPush className={cx(styles[color])} data-status={status} />,
    condition: <IconTaskQuestion className={cx(styles[color])} data-status={status} />,
    wait: <IconTaskWait className={cx(styles[color])} data-status={status} />,
    join: <IconTaskJoin className={cx(styles[color])} data-status={status} />,
    ab_test: <IconTaskAbTest className={cx(styles[color])} data-status={status} />,
    assignment: <IconTaskAssigment className={cx(styles[color])} data-status={status} />,
    crm_message: <IconTaskCrmMessage className={cx(styles[color])} data-status={status} />,
    exit: <IconTaskExit className={cx(styles[color], styles.iconRomb)} data-status={status} />,
  }
  return <>{taskIcons[type]}</>
}

export default TaskIcon
