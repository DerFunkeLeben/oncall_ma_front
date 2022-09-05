import { createContext, Dispatch, SetStateAction, useContext } from 'react'
import { IMessageBox } from 'types'

interface IMessageBoxContext {
  messageBox: IMessageBox
  setMessageBox: Dispatch<SetStateAction<IMessageBox>>
  hideMessageBox: () => void
}

export const MessageBoxContext = createContext({} as IMessageBoxContext)

const useMessageBoxContext = () => useContext(MessageBoxContext)

export default useMessageBoxContext
