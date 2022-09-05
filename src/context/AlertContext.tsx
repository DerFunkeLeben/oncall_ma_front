import { createContext, Dispatch, SetStateAction, useContext } from 'react'
import { IAlertBox } from 'types'

interface IAlertBoxContext {
  alertBox: IAlertBox
  setAlertBox: Dispatch<SetStateAction<IAlertBox>>
  hideAlertBox: () => void
}

export const AlertContext = createContext({} as IAlertBoxContext)

const useAlertContext = () => useContext(AlertContext)

export default useAlertContext
