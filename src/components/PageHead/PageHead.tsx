import { FC, ChangeEvent } from 'react'
import cx from 'classnames'
import { useHistory } from 'react-router-dom'

import Button from 'components/parts/Button/Button'
import EditableTitle from 'components/EditableTitle/EditableTitle'
import MessageBox from 'components/MessageBox/MessageBox'

import useToggle from 'hooks/useToggle'

import { IconArrow } from 'assets/icons'
import styles from './PageHead.module.scss'
import buttonThemes from 'components/parts/Button/ButtonThemes.module.scss'

interface IPageHead {
  title: string
  contactCount?: string
  createDate?: string
  lastUpdateDate?: string
  separateBlock?: React.ReactElement
  mod?: boolean
  buttonBackName?: string
  buttonBackUrl?: string
  titleEditable?: boolean
  buttonBackMessageBox?: boolean
  handleTitleChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const PageHead: FC<IPageHead> = ({
  buttonBackUrl,
  buttonBackName,
  mod,
  separateBlock,
  title,
  children,
  contactCount,
  createDate,
  titleEditable,
  handleTitleChange,
  buttonBackMessageBox,
}) => {
  const history = useHistory()
  const [messageBoxShown, toggleMessageBox] = useToggle()

  const goBack = () => {
    if (!buttonBackUrl) return
    history.push(buttonBackUrl)
  }

  return (
    <div className={cx(styles.head, mod && styles.bigHeadMode)}>
      <div className={styles.titleContainer}>
        {buttonBackName && (
          <Button
            modificator={buttonThemes.theme_additional}
            onClick={buttonBackMessageBox ? toggleMessageBox : goBack}
          >
            <IconArrow className={styles.buttonBackIcon} />
            <span>{buttonBackName}</span>
          </Button>
        )}
        {titleEditable ? (
          <EditableTitle {...{ title, handleTitleChange }} />
        ) : (
          <h1 className={cx(styles.title, 'header_1')}>{title}</h1>
        )}
        {(contactCount || createDate) && (
          <div className={cx(styles.infoBlockContainer)}>
            {contactCount && (
              <div className={cx(styles.infoBlock, 'text_1')}>
                <span>{`Количество контактов: ${contactCount}`}</span>
              </div>
            )}
            {createDate && (
              <div className={cx(styles.infoBlock, 'text_1')}>
                <span>{`Дата создания: ${createDate}`}</span>
              </div>
            )}
          </div>
        )}
      </div>
      <div className={styles.container}>
        {separateBlock && <div className={styles.leftBlock}>{separateBlock}</div>}
        <div className={styles.rightBlock}>{children}</div>
      </div>

      <MessageBox
        isOpen={messageBoxShown}
        close={toggleMessageBox}
        handleConfirm={goBack}
        title={`Хотите сохранить изменения<br>перед выходом?`}
        buttons={['Отмена', 'Не сохранять']}
      />
    </div>
  )
}

export default PageHead
