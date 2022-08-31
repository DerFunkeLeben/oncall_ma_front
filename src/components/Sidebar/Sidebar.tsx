import { FC } from 'react'
import cx from 'classnames'

import styles from './Sidebar.module.scss'
import {
  IconLogo,
  IconProfile,
  IconAnalytics,
  IconAudit,
  IconFiles,
  IconJourney,
  IconBell,
} from 'assets/icons'
import { PagesData } from 'constants/url'
import SidebarButton from './SidebarButton/SidebarButton'

const buttons = [
  {
    Icon: IconAudit,
    name: PagesData.AUDIENCES.name,
    path: PagesData.AUDIENCES.link,
  },
  {
    Icon: IconFiles,
    name: PagesData.ALL_CONTENT.name,
    path: PagesData.ALL_CONTENT.link,
  },
  {
    Icon: IconJourney,
    name: PagesData.SCENARIOS.name,
    path: PagesData.SCENARIOS.link,
  },
  {
    Icon: IconAnalytics,
    name: PagesData.ANALYTICS.name,
    path: PagesData.ANALYTICS.link,
  },
]
const buttonsBottomMenu = [
  {
    Icon: IconBell,
    name: 'Уведомления',
    path: '/',
  },
  {
    Icon: IconProfile,
    name: 'Профиль',
    path: '/',
  },
]

const Sidebar: FC = () => {
  return (
    <div className={cx(styles.Sidebar)}>
      <div className={cx(styles.logContainer)}>
        <IconLogo className={styles.icon} />
      </div>
      <div className={cx(styles.flexContainer)}>
        {buttons.map((element) => {
          const { name, Icon, path } = element
          return <SidebarButton name={name} Icon={Icon} path={path} key={name} />
        })}
      </div>
      <div className={cx(styles.flexContainer)}>
        {buttonsBottomMenu.map((element) => {
          const { name, Icon, path } = element
          return <SidebarButton name={name} Icon={Icon} path={path} key={name} />
        })}
      </div>
    </div>
  )
}

export default Sidebar
