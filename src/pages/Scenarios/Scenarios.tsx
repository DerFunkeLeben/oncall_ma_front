import { FC } from 'react'

import styles from './Scenarios.module.scss'
import Sidebar from 'components/parts/Sidebar/Sidebar'

const Scenarios: FC = () => {
  return (
    <div className={styles.page}>
      <Sidebar />
      Scenarios
    </div>
  )
}

export default Scenarios
