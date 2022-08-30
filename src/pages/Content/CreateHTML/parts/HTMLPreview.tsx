import { FC, useState, useRef, useEffect, memo } from 'react'
import cx from 'classnames'

import ScrollArea from 'containers/ScrollArea/ScrollArea'

import styles from '../CreateHTML.module.scss'

interface IHTMLPreview {
  HTML: string | undefined
}
const HTMLPreview: FC<IHTMLPreview> = ({ HTML }) => {
  const [maxScrollHeight, setMaxScrollHeight] = useState<string>('100vh')
  const iFrameRef = useRef(document.createElement('iframe'))
  const wrapperRef = useRef<HTMLDivElement>(null)

  function calcHeight() {
    const refNode = iFrameRef.current
    const height = refNode.contentWindow?.document.body.scrollHeight
    refNode.height = height + ''
  }

  useEffect(() => {
    const refNode = wrapperRef.current
    if (!refNode) return

    const { top } = refNode.getBoundingClientRect()
    setMaxScrollHeight(`calc(100vh - ${top}px)`)
  }, [])

  console.log('rerender preview')
  return (
    <div className={cx(styles.renderedHTMLWrapper)}>
      <ScrollArea modificator={styles.scroll} customRef={wrapperRef} maxHeight={maxScrollHeight}>
        <iframe srcDoc={HTML} className={styles.iframe} ref={iFrameRef} onLoad={calcHeight} />
      </ScrollArea>
    </div>
  )
}

export default memo(HTMLPreview)
