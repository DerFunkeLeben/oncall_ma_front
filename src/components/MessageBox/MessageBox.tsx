import { FC } from 'react'
import cx from 'classnames'

import Button from 'components/parts/Button/Button'
import Popup from 'containers/Popup/Popup'

import useMessageBoxContext from 'context/MessageBoxContext'

import styles from './MessageBox.module.scss'
import buttonThemes from 'components/parts/Button/ButtonThemes.module.scss'

const MessageBox: FC = () => {
  const { messageBox, hideMessageBox } = useMessageBoxContext()
  const { isOpen, title, handleConfirm, buttons } = messageBox

  const [cancelBtn, okBtn] = buttons
  return (
    <Popup isOpen={isOpen} close={hideMessageBox}>
      <div
        className={cx(styles.title, 'text_2_hl_1')}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div className={cx(styles.btnsWrap)}>
        <Button
          modificator={cx(buttonThemes.theme_secondary, styles.btn, 'text_2_hl_1')}
          onClick={hideMessageBox}
        >
          {cancelBtn}
        </Button>
        {okBtn && (
          <Button
            modificator={cx(buttonThemes.theme_secondary, styles.btn, 'text_2_hl_1')}
            onClick={() => {
              handleConfirm?.()
              hideMessageBox()
            }}
          >
            {okBtn}
          </Button>
        )}
      </div>
    </Popup>
  )
}

export default MessageBox
