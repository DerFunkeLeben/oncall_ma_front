import { FC } from 'react'
import cx from 'classnames'
import { useHistory, useRouteMatch } from 'react-router-dom'

import Button from 'components/parts/Button/Button'

import styles from './PageHead.module.scss'
import buttonStyles from 'components/parts/Button/ButtonThemes.module.scss'

import { IconArrow } from 'assets/icons'

interface IPageHead {
  title: string
  leftSide?: React.ReactElement
  mod?: boolean
  buttonBackName?: string
  buttonBackUrl?: string
}

const PageHead: FC<IPageHead> = ({
  buttonBackUrl,
  buttonBackName,
  mod,
  leftSide,
  title,
  children,
}) => {
  const history = useHistory()
  const { url } = useRouteMatch()
  const goBack = () => {
    if (!buttonBackUrl) return
    history.push(`/${buttonBackUrl}`)
  }
  return (
    <div className={cx(styles.head, mod && styles.bigHeadMode)}>
      <div className={styles.titleContainer}>
        {buttonBackName && (
          <Button modificator={buttonStyles.theme_additional} onClick={goBack}>
            <IconArrow className={styles.buttobBackIcon} />
            {buttonBackName}
          </Button>
        )}
        <h1 className={cx(styles.title, 'header_1')}>{title}</h1>
      </div>
      <div className={styles.container}>
        {leftSide && <div className={styles.leftBlock}>{leftSide}</div>}
        <div className={styles.rightBlock}>{children}</div>
      </div>
    </div>
  )
}
export default PageHead
