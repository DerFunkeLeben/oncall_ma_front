import cx from 'classnames'
import CreateDropDown from 'components/CreateDropDown/CreateDropDown'
import helpMessages from 'constants/helpMessages'
import styles from './EmptyTable.module.scss'
import buttonStyles from 'components/parts/Button/ButtonThemes.module.scss'
import { ICreateOption } from 'types'
import { IconAudiences } from 'assets/icons'
import { Align } from 'constants/dictionary'

export function EmptyTable({ createOptions }: { createOptions: ICreateOption[] }) {
  return (
    <div className={styles.emptyTableWrapper}>
      <IconAudiences />
      <div
        className={styles.emptyCaption}
        dangerouslySetInnerHTML={{ __html: helpMessages.EMPTY_AUDIENCES_TABLE }}
      />
      <CreateDropDown
        mode={cx(buttonStyles.theme_additional, styles.buttonCreate)}
        createOptions={createOptions}
        align={Align.TOP_CENTER}
        btnTitle={'Создать аудиторию'}
      />
    </div>
  )
}
