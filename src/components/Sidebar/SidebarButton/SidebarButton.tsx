import { FC } from 'react'
import { NavLink } from 'react-router-dom'

import styles from './SidebarButton.module.scss'

export interface ISidebarButton {
  name: string
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  path?: string
  handleClick?: () => void
}

const SidebarButton: FC<ISidebarButton> = ({ Icon, name, path, handleClick }) => {
  if (path)
    return (
      <NavLink
        exact
        to={path}
        className={styles.Button}
        activeClassName={styles.Button_active}
        key={name}
        data-tooltip={name}
      >
        <Icon className={styles.icon} />
      </NavLink>
    )

  return (
    <div className={styles.Button} key={name} data-tooltip={name} onClick={handleClick}>
      <Icon className={styles.icon} />
    </div>
  )
}

export default SidebarButton
