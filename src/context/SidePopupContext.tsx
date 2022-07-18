import { createContext, useContext } from 'react'

export const PopupContext = createContext(undefined as any)

const usePopupContext = () => useContext(PopupContext)

export default usePopupContext
