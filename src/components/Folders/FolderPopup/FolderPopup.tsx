import { FC, useState } from 'react'
import cx from 'classnames'

import Button from 'components/parts/Button/Button'
import Popup from 'containers/Popup/Popup'
import { FolderAction } from 'types'

import styles from './MessageBox.module.scss'
import buttonThemes from 'components/parts/Button/ButtonThemes.module.scss'

interface IFolderPopup {
  title: string
  isOpen: boolean
  action: FolderAction
  close: () => void
  handleConfirm?: () => void
}

const FolderPopup: FC<IFolderPopup> = ({ isOpen, close, title, handleConfirm, action }) => {
  const [folderName, setFolderName] = useState<string>('')
  return null
  // <Popup isOpen={isOpen} close={close}>
  //   <div
  //     className={cx(styles.title, 'text_2_hl_1')}
  //     dangerouslySetInnerHTML={{ __html: title }}
  //   />
  //   <div className={cx(styles.btnsWrap)}>
  //     <Button
  //       modificator={cx(buttonThemes.theme_secondary, styles.btn, 'text_2_hl_1')}
  //       onClick={close}
  //     >
  //       {cancelBtn}
  //     </Button>
  //     {okBtn && (
  //       <Button
  //         modificator={cx(buttonThemes.theme_secondary, styles.btn, 'text_2_hl_1')}
  //         onClick={handleConfirm}
  //       >
  //         {okBtn}
  //       </Button>
  //     )}
  //   </div>
  // </Popup>
}

export default FolderPopup
