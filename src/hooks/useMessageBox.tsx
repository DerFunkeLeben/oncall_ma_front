import { useState } from 'react'
import { IMessageBox } from 'types'

const INIT_MESSAGEBOX: IMessageBox = {
  isOpen: false,
  handleConfirm: undefined,
  title: '',
  buttons: [],
}

export const useMessageBox = () => {
  const [messageBox, setMessageBox] = useState(INIT_MESSAGEBOX)
  const hideMessageBox = () => setMessageBox(INIT_MESSAGEBOX)

  return { messageBox, setMessageBox, hideMessageBox }
}
