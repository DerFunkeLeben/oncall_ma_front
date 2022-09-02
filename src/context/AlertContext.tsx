import { createContext, useContext } from 'react'

export const INIT_ALERTBOX = {
  message: '',
  icon: undefined,
  isOpen: false,
}

export const AlertContext = createContext(undefined as any)

const useAlertContext = () => useContext(AlertContext)

export default useAlertContext
