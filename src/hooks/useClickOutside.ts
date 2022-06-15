import { useEffect } from 'react'

type AnyEvent = MouseEvent | TouchEvent

const useClickOutside = (
  isOpen: boolean,
  ref: React.RefObject<HTMLDivElement>,
  handler: () => void
) => {
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const onClick = (event: AnyEvent) => {
      const clickedInsideElem = ref?.current?.contains(event.target as HTMLElement)
      if (!clickedInsideElem) {
        handler()
      }
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
    }
  }, [isOpen, handler])
}

export default useClickOutside
