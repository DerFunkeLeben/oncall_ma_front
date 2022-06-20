import { useRef, useLayoutEffect, RefObject } from 'react'

const useInfiniteScroll = (
  wrapperRef: RefObject<HTMLDivElement>,
  innerRef: RefObject<HTMLDivElement>,
  dependencies: any,
  callback: () => void
): void => {
  const isHandleUsed = useRef(false)

  useLayoutEffect(() => {
    const element = innerRef?.current
    if (element) {
      const windowScroll = () => {
        if (!wrapperRef.current) return

        const elementBottom = element.getBoundingClientRect().bottom * 0.5
        const screenMiddle = wrapperRef.current?.offsetHeight

        if (screenMiddle >= elementBottom && !isHandleUsed.current) {
          isHandleUsed.current = true
          callback()
        }
      }

      isHandleUsed.current = false
      wrapperRef.current?.addEventListener('scroll', windowScroll)
      return () => wrapperRef.current?.removeEventListener('scroll', windowScroll)
    }
  }, [dependencies])
}

export default useInfiniteScroll
