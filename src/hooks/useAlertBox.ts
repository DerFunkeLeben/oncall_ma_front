import { useState } from 'react'
import { IAlertBox } from 'types'

const INIT_ALERTBOX: IAlertBox = {
  message: '',
  icon: undefined,
  isOpen: false,
}

export const useAlertBox = () => {
  const [alertBox, setAlertBox] = useState(INIT_ALERTBOX)
  const hideAlertBox = () => setAlertBox(INIT_ALERTBOX)
  return { alertBox, setAlertBox, hideAlertBox }
}
