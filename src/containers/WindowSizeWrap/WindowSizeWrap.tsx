import { FC, useState, useEffect } from 'react'

import ScreenSizeContext from 'context/screenSizeContext'

interface IProps {
  children: React.ReactNode
}

const checkWindowSize = () => {
  return window.innerWidth
}

const WindowSizeWrap: FC<IProps> = ({ children }: IProps) => {
  const [windowSize, setWindowSize] = useState('0')

  const changeWindowSize = () => {
    const resultQuery = checkWindowSize()
    if (resultQuery) setWindowSize(String(resultQuery))
  }

  useEffect(() => {
    changeWindowSize()
    window.addEventListener('resize', changeWindowSize)

    return () => {
      window.removeEventListener('resize', changeWindowSize)
    }
  }, [])

  return <ScreenSizeContext.Provider value={windowSize}>{children}</ScreenSizeContext.Provider>
}

export default WindowSizeWrap
