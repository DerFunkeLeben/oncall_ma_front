import { FC, Dispatch, SetStateAction, useState } from 'react'
import { createPortal } from 'react-dom'
import cx from 'classnames'

import Button from 'components/parts/Button/Button'
import ProfilePopupContent from './ProfilePopupContent'

import buttonThemes from 'components/parts/Button/ButtonThemes.module.scss'
import sidePopupStyles from 'components/SidePopup/SidePopup.module.scss'
import styles from './ProfilePopup.module.scss'

import { IconLogout, IconPlus } from 'assets/icons'
import useAuth from 'store/auth/useAuth'

interface ISidePopup {
  close: () => void
}

const ProfilePopup: FC<ISidePopup> = ({ close }) => {
  const { logout } = useAuth()
  const [editableBlock, setEditableBlock] = useState<number>(-1)
  const [inputsState, setInputsState] = useState<{ [key: string]: string }>({
    fio: 'Джейсон Стетхэм',
    job: 'Администратор',
    email: 'admin@example.com',
    phone: '+7(999)999-99-99',
  })

  const save = () => {
    console.log('save')
    close()
  }

  const showFooterBtns = editableBlock !== -1

  return createPortal(
    <div className={sidePopupStyles.popupWrapper}>
      <div className={sidePopupStyles.popupBackground} onClick={close} />

      <div className={cx(sidePopupStyles.popupContentainer, styles.popupContentainer)}>
        <div className={cx(sidePopupStyles.header, styles.header)}>
          <div className={sidePopupStyles.headerWrapper}>
            <Button modificator={buttonThemes.theme_secondary} onClick={close}>
              <IconPlus className={sidePopupStyles.iconCross} />
            </Button>
            <h2 className={cx(sidePopupStyles.title, 'header_2')}>Профиль</h2>

            <Button
              modificator={cx(buttonThemes.theme_secondary, styles.logoutBtn)}
              onClick={logout}
            >
              <IconLogout />
              Выйти
            </Button>
          </div>
        </div>

        <div className={cx(sidePopupStyles.popupContent, styles.popupContent)}>
          <ProfilePopupContent
            {...{ inputsState, setInputsState, editableBlock, setEditableBlock }}
          />
        </div>

        {showFooterBtns && (
          <div className={cx(sidePopupStyles.footer, styles.popupFooter)}>
            <div className={sidePopupStyles.footerButtons}>
              <Button onClick={close} modificator={buttonThemes.theme_secondary}>
                Отменить
              </Button>
              <Button onClick={save}>Сохранить</Button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}

export default ProfilePopup
