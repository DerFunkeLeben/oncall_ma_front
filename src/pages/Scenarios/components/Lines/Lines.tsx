import { FC } from 'react'
import cx from 'classnames'

import styles from './Lines.module.scss'

interface ILines {
  matrix: any
}

const SIZE = {
  taskWidth: 80,
  taskHeight: 88,
  gap: 80,
  paddingField: 45,
  startBlockWidth: 150,
  startBlockHeight: 200,
}

const fieldSize = 5000

const Lines: FC<ILines> = ({ matrix }) => {
  console.log(matrix)

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={fieldSize}
      height={fieldSize}
      viewBox={`0 0 ${fieldSize} ${fieldSize}`}
      className={styles.lines}
    >
      <g id="icon">
        <path
          id="path"
          data-name="path"
          d={'M 0 0 L 100 0'}
          fill="none"
          strokeWidth="2"
          stroke="#000"
        />
      </g>
    </svg>
  )
}

export default Lines
