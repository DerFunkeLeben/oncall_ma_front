import { FC } from 'react'

import Sidebar from 'components/Sidebar/Sidebar'

import notFoundImg from './img/not_found.png'
import styles from './404.module.scss'

const text = `Очень жаль, но такой страницы не существует. Возможно вы указали неправильный адрес, или страница, на которую вы хотели зайти, устарела или была удалена.`

const Error404: FC = () => {
  return (
    <div className={styles.page}>
      <Sidebar />
      <div className={styles.pageContent}>
        <div className={styles.textWrapper}>
          <span className={styles.text_top}>
            страница
            <br />
            не найдена
          </span>
          <span className={styles.text_404}>404</span>
          <span className={styles.text_bottom}>{text}</span>
        </div>
        <img className={styles.img} src={notFoundImg} alt="not-found" />
      </div>
    </div>
  )
}

export default Error404
