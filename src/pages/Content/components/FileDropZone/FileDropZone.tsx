import { FC, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import cx from 'classnames'
import axios from 'axios'

import { IconFolderYellow } from 'assets/icons'

import styles from './FileDropZone.module.scss'

const dropMainCaption = 'Перетащите в эту область файл для загрузки'
const dropSecondCaption = 'Загрузить из папки'

const uploadFiles = async (acceptedFiles: any) => {
  const formData = new FormData()
  formData.append('acceptedFiles', acceptedFiles)
  try {
    const response = await axios({
      method: 'post',
      url: '/api/upload/file',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  } catch (error) {
    console.log(error)
  }
}

interface IFileDropZone {
  handleDropFile: (acceptedFiles: any) => void
}

const FileDropZone: FC<IFileDropZone> = ({ handleDropFile }) => {
  const onDrop = useCallback((acceptedFiles: any) => {
    handleDropFile(acceptedFiles)
    console.log(acceptedFiles)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const rootProps = getRootProps()
  const inputProps = getInputProps()
  return (
    <div className={styles.dropOuterWrapper}>
      <div
        {...rootProps}
        className={cx(styles.dropInnerWrapper, isDragActive && styles['dropInnerWrapper--active'])}
      >
        <input {...inputProps} />

        <IconFolderYellow />
        <div className={styles.dropMainCaption}>{dropMainCaption}</div>
        <div className={styles.dropOrCaption}>или</div>
        <div className={styles.dropSecondCaption}>{dropSecondCaption}</div>
      </div>
    </div>
  )
}

export default FileDropZone