import { FC, useEffect, useRef, useState } from 'react'
import cx from 'classnames'
import Draggable from 'react-draggable'

import styles from './Action.module.scss'

interface Iaction {
  name: string
}

const Actions: FC<Iaction> = ({ name }) => {
  const handleStart = (e: any) => {
    e.preventDefault()
  }

  const handleDrag = (e: any) => {
    e.preventDefault()
  }
  const handleStop = (e: any) => {
    e.preventDefault()
  }

  return (
    <Draggable onDrag={handleDrag} onStop={handleStop} onStart={handleStart}>
      <div className={styles.action} data-type={'action'}>
        <p className={styles.name}>{name}</p>
      </div>
    </Draggable>
  )
}

export default Actions
