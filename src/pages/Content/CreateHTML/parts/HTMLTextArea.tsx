import { FC, ChangeEvent, useState, useEffect, useRef } from 'react'
import TextAreaAutosize from 'react-textarea-autosize'
import cx from 'classnames'

import ScrollArea from 'containers/ScrollArea/ScrollArea'

import styles from '../CreateHTML.module.scss'
import textAreaStyles from 'components/parts/TextArea/TextArea.module.scss'

interface IHTMLTextArea {
  HTML: string | undefined
  handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}
// TODO при добавлении / удалении новых строк прыгает

const HTMLTextArea: FC<IHTMLTextArea> = ({ HTML, handleChange }) => {
  const [scrollHeight, setScrollHeight] = useState<string>('100vh')

  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const refNode = wrapperRef.current
    if (!refNode) return

    const { top } = refNode.getBoundingClientRect()
    setScrollHeight(`calc(100vh - ${top}px)`)
  }, [])

  return (
    <ScrollArea modificator={styles.scroll} customRef={wrapperRef} maxHeight={scrollHeight}>
      <TextAreaAutosize
        value={HTML}
        name={'HTML'}
        className={cx(textAreaStyles.textarea, styles.textArea)}
        onChange={handleChange}
        cacheMeasurements={true}
        spellCheck={false}
        minRows={45}
      />
    </ScrollArea>
  )
}
export default HTMLTextArea
