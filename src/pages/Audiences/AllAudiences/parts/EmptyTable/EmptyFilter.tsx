import helpMessages from 'constants/helpMessages'
import styles from './EmptyTable.module.scss'
import { IconAudiences } from 'assets/icons'

export function EmptyFilter() {
  return (
    <div className={styles.emptyTableWrapper}>
      <IconAudiences />
      <div
        className={styles.emptyCaption}
        dangerouslySetInnerHTML={{ __html: helpMessages.EMPTY_FILTER_RESULT }}
      />
    </div>
  )
}
