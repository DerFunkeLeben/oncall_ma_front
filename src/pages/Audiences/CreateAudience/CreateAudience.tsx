import { FC } from 'react'
import cx from 'classnames'
import { useParams } from 'react-router-dom'

import styles from './CreateAudience.module.scss'
import { IPageData } from 'types'

const CreateAudience: FC<IPageData> = () => {
  const { audienceid } = useParams<{ audienceid?: string }>()
  console.log(audienceid)
  return (
    <div className={cx(styles.pageContent)}>
      <p>CREATE AUDIENCES</p>
    </div>
  )
}

export default CreateAudience
