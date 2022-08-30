import { FC, ChangeEvent, useRef } from 'react'
import TextAreaAutosize from 'react-textarea-autosize'
import cx from 'classnames'

import ScrollArea from 'containers/ScrollArea/ScrollArea'
import useScrollHeight from 'hooks/useScrollHeight'

import styles from '../ContentHTML.module.scss'
import textAreaStyles from 'components/parts/TextArea/TextArea.module.scss'

interface IHTMLTextArea {
  HTML: string | undefined
  handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}
// TODO при добавлении / удалении новых строк прыгает

const HTMLTextArea: FC<IHTMLTextArea> = ({ HTML, handleChange }) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const scrollHeight = useScrollHeight(wrapperRef)

  return (
    <ScrollArea modificator={styles.scroll} customRef={wrapperRef} maxHeight={scrollHeight}>
      <TextAreaAutosize
        value={HTML}
        name={'HTML'}
        className={cx(textAreaStyles.textarea, styles.textArea)}
        onChange={handleChange}
        // cacheMeasurements={true}
        spellCheck={false}
        minRows={45}
      />
    </ScrollArea>
  )
}
export default HTMLTextArea
