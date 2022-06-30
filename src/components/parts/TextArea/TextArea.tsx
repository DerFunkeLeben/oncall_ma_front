import { FC } from 'react'
import cx from 'classnames'

import styles from './TextArea.module.scss'
export interface ITextAreaBase extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  modificator?: string
}

const TextArea: FC<ITextAreaBase> = ({ id, label, children, modificator, disabled, ...props }) => {
  return (
    <div className={cx(styles.wrapper, { [styles.disabled]: disabled })}>
      {label && (
        <label className={styles.textareaLabel} htmlFor={id}>
          {label}
        </label>
      )}
      <textarea id={id} className={cx(styles.textarea, modificator)} {...props} />
      {children}
    </div>
  )
}

export default TextArea
