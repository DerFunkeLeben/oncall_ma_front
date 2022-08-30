import { FC, useRef, memo } from 'react'
import cx from 'classnames'

import ScrollArea from 'containers/ScrollArea/ScrollArea'

import styles from '../ContentHTML.module.scss'
import useScrollHeight from 'hooks/useScrollHeight'

interface IHTMLPreview {
  HTML: string | undefined
}
const HTMLPreview: FC<IHTMLPreview> = ({ HTML }) => {
  const iFrameRef = useRef(document.createElement('iframe'))
  const wrapperRef = useRef<HTMLDivElement>(null)

  function calcHeight() {
    const refNode = iFrameRef.current
    const height = (refNode.contentWindow?.document.body.scrollHeight || 0) + 20
    refNode.height = height + ''
  }

  const scrollHeight = useScrollHeight(wrapperRef)

  return (
    <div className={cx(styles.renderedHTMLWrapper)}>
      <ScrollArea modificator={styles.scroll} customRef={wrapperRef} maxHeight={scrollHeight}>
        <iframe
          srcDoc={HTML}
          className={styles.iframe}
          scrolling="no"
          ref={iFrameRef}
          onLoad={calcHeight}
        />
      </ScrollArea>
    </div>
  )
}

export default memo(HTMLPreview)
