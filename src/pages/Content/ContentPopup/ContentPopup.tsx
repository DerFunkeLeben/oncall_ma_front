import { FC, useState } from 'react'
import { createPortal } from 'react-dom'
import cx from 'classnames'

import Button from 'components/parts/Button/Button'
import ContentPopupInputs from './ContentPopupInputs'

import buttonThemes from 'components/parts/Button/ButtonThemes.module.scss'
import sidePopupStyles from 'components/SidePopup/SidePopup.module.scss'
import styles from './ContentPopup.module.scss'

import { IconPlus } from 'assets/icons'

interface ISidePopup {
  subtitle: string
  placeholder: string
  btnAddText: string
  close: () => void
  handleSave: (inputs: string[]) => void
  inputs: string[]
}

const ContentPopup: FC<ISidePopup> = ({
  close,
  subtitle,
  placeholder,
  btnAddText,
  handleSave,
  inputs,
}) => {
  const [inputsState, setInputsState] = useState<string[]>(inputs || [''])

  const handleCancel = () => {
    setInputsState(inputs)
    close()
  }

  return createPortal(
    <div className={sidePopupStyles.popupWrapper}>
      <div className={sidePopupStyles.popupBackground} onClick={handleCancel} />

      <div className={cx(sidePopupStyles.popupContentainer, styles.popupContentainer)}>
        <div className={sidePopupStyles.header}>
          <div className={sidePopupStyles.headerWrapper}>
            <Button modificator={buttonThemes.theme_secondary} onClick={handleCancel}>
              <IconPlus className={sidePopupStyles.iconCross} />
            </Button>
            <h2 className={cx(sidePopupStyles.title, 'header_2')}>Тестовая отправка</h2>
          </div>
        </div>
        <div className={cx(sidePopupStyles.popupContent, styles.popupContent)}>
          <ContentPopupInputs
            {...{ subtitle, placeholder, btnAddText, inputsState, setInputsState }}
          />
        </div>
        <div className={cx(sidePopupStyles.footer, styles.popupFooter)}>
          <div className={sidePopupStyles.footerButtons}>
            <Button onClick={handleCancel} modificator={buttonThemes.theme_secondary}>
              Отменить
            </Button>
            <Button onClick={() => handleSave(inputsState)}>Сохранить</Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default ContentPopup
