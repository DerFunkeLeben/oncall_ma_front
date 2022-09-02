import { FC, ChangeEvent } from 'react'

import cx from 'classnames'

import InputBase from 'components/parts/InputBase/InputBase'
import inputThemes from 'components/parts/InputBase/InputBaseThemes.module.scss'
import styles from './EditableTitle.module.scss'

import { IconEdit } from 'assets/icons'

interface IEditableTitle {
  title: string
  handleTitleChange: ((event: ChangeEvent<HTMLInputElement>) => void) | undefined
}

const EditableTitle: FC<IEditableTitle> = ({ title, handleTitleChange }) => {
  const calibrationText = () => {
    if (!title) return 'Название'
    if (title.length > 40) return title.slice(-40)
    return title
  }

  return (
    <div className={styles.inputContainer}>
      <InputBase
        value={title}
        name={'title'}
        handleInputChange={handleTitleChange}
        modificator={cx('header_1', inputThemes.theme_editable, styles.input)}
        wrapperModificator={inputThemes.theme_editable_wrapper}
      >
        <IconEdit />
      </InputBase>
      <span className={cx(styles.sizeCalibrator, 'text_1')}>{calibrationText()}</span>
    </div>
  )
}

export default EditableTitle
