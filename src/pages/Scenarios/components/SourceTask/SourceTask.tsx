import { FC } from 'react'
import cx from 'classnames'

import styles from './SourceTask.module.scss'

interface ISourceTask {
  style: { [key: string]: any }
}

const SourceTask: FC<ISourceTask> = ({ style }) => {
  return (
    <div className={styles.sourceTask} style={style}>
      <div className={styles.innerBlock}>
        <p className={cx(styles.title, 'text_05')}>
          Выберите <br /> аудиторию
        </p>
      </div>
    </div>
  )
}

export default SourceTask
