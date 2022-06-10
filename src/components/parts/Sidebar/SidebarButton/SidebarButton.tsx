import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import styles from './SidebarButton.module.scss'

export interface ISidebarButton {
  name: string
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  path?: string
}

const SidebarButton: FC<ISidebarButton> = ({ Icon, name, path = '/' }) => {
  return (
    <NavLink
      exact
      to={path}
      className={styles.Button}
      activeClassName={styles.Button_active}
      key={name}
    >
      <Icon className={styles.icon} />
    </NavLink>
  )
}

export default SidebarButton
