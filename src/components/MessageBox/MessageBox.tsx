import { FC } from 'react'
import cx from 'classnames'

import Button from 'components/parts/Button/Button'
import Popup from 'containers/Popup/Popup'

import styles from './MessageBox.module.scss'
import buttonThemes from 'components/parts/Button/ButtonThemes.module.scss'

interface IMessageBox {
  title: string
  isOpen: boolean
  buttons: string[]
  close: () => void
  handleConfirm?: () => void
}

const MessageBox: FC<IMessageBox> = ({ isOpen, close, title, handleConfirm, buttons }) => {
  const [cancelBtn, okBtn] = buttons
  return (
    <Popup isOpen={isOpen} close={close}>
      <div
        className={cx(styles.title, 'text_2_hl_1')}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div className={cx(styles.btnsWrap)}>
        <Button
          modificator={cx(buttonThemes.theme_secondary, styles.btn, 'text_2_hl_1')}
          onClick={close}
        >
          {cancelBtn}
        </Button>
        {okBtn && (
          <Button
            modificator={cx(buttonThemes.theme_secondary, styles.btn, 'text_2_hl_1')}
            onClick={handleConfirm}
          >
            {okBtn}
          </Button>
        )}
      </div>
    </Popup>
  )
}

export default MessageBox
