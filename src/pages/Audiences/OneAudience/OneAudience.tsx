import { FC } from 'react'
import cx from 'classnames'
import { useParams } from 'react-router-dom'

import styles from './OneAudience.module.scss'
import { IPageData } from 'types'

const OneAudience: FC<IPageData> = () => {
  const { audienceid } = useParams<{ audienceid?: string }>()
  console.log(audienceid)
  return (
    <div className={cx(styles.pageContent)}>
      <p>ONE AUDIENCES</p>
    </div>
  )
}

export default OneAudience
