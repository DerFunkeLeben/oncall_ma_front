import { FC } from 'react'

import styles from './Audience.module.scss'
import Sidebar from 'components/parts/Sidebar/Sidebar'

const Audience: FC = () => {
  return (
    <div className={styles.audience}>
      <Sidebar />
      Audience
    </div>
  )
}

export default Audience
