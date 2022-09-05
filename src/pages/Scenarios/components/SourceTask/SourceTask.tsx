import { FC } from 'react'
import cx from 'classnames'

import styles from './SourceTask.module.scss'

interface ISourceTask {
  style: { [key: string]: any }
}

const drawLine = () => {
  const length = 300
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={length}
      height="88"
      viewBox={`0 0 ${length} 88`}
      className={styles.line}
    >
      <g id="icon">
        <path
          id="path"
          data-name="path"
          d={`M 0 44 L ${length} 44`}
          fill="none"
          strokeWidth="2"
          stroke="#8D87AC"
        />
      </g>
    </svg>
  )
}

const SourceTask: FC<ISourceTask> = ({ style }) => {
  return (
    <div className={styles.source} style={style}>
      {drawLine()}
      <div className={styles.sourceTask}>
        <div className={styles.innerBlock}>
          <p className={cx(styles.title, 'text_05')}>
            Выберите <br /> аудиторию
          </p>
        </div>
      </div>
    </div>
  )
}

export default SourceTask
