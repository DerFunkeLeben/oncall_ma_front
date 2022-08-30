import { useState, useEffect } from 'react'

const useScrollHeight = (wrapperRef: any) => {
  const [scrollHeight, setScrollHeight] = useState<string>('100vh')

  useEffect(() => {
    const refNode = wrapperRef.current
    if (!refNode) return

    const { top } = refNode.getBoundingClientRect()
    setScrollHeight(`calc(100vh - ${top + 10}px)`)
  }, [])

  return scrollHeight
}

export default useScrollHeight
