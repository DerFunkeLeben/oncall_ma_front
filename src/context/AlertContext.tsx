import { createContext, useContext, useState } from 'react'

export const INIT_ALERTBOX = {
  message: '',
  icon: undefined,
  isOpen: false,
}

export const AlertContext = createContext(undefined as any)

export const useAlertBox = () => {
  const [alertBox, setAlertBox] = useState(INIT_ALERTBOX)
  const hideAlertBox = () => setAlertBox(INIT_ALERTBOX)
  return { alertBox, setAlertBox, hideAlertBox }
}

const useAlertContext = () => useContext(AlertContext)

export default useAlertContext
