import { FC, ChangeEvent } from 'react'
import cx from 'classnames'

import styles from './TextArea.module.scss'
export interface ITextAreaBase extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  value?: string
  modificator?: string
  handleChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

const TextArea: FC<ITextAreaBase> = ({
  id,
  label,
  children,
  modificator,
  disabled,
  value,
  handleChange,
  ...props
}) => {
  return (
    <div className={cx(styles.wrapper, { [styles.disabled]: disabled })}>
      {label && (
        <label className={styles.textareaLabel} htmlFor={id}>
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={cx(styles.textarea, modificator)}
        value={value}
        onChange={handleChange}
        {...props}
      />
      {children}
    </div>
  )
}

export default TextArea
