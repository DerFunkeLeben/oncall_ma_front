import { FC, ChangeEvent, useState } from 'react'
import cx from 'classnames'

import InputBase from 'components/parts/InputBase/InputBase'
import FileDropZone from '../FileDropZone/FileDropZone'
import HTMLHead from './parts/HTMLHead'
import HTMLTextArea from './parts/HTMLTextArea'
import HTMLPreview from './parts/HTMLPreview'

import useDebounce from 'hooks/useDebounce'
import { IPageData } from 'types'

import styles from './CreateHTML.module.scss'

interface IHTMLFile {
  title: string
  theme: string
  preheader: string
  HTML: string | undefined
}

const CreateHTML: FC<IPageData> = () => {
  const [settings, setSettings] = useState<IHTMLFile>({
    title: 'Название',
    theme: '',
    preheader: '',
    HTML: undefined,
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setSettings({
      ...settings,
      [name]: value,
    })
  }

  const showTextArea = settings.HTML != undefined

  const handleDropHTML = (acceptedFiles: Array<File>) => {
    const file = acceptedFiles[0]
    const reader = new FileReader()

    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      const result = reader.result?.toString()
      setSettings((prevState) => {
        return {
          ...prevState,
          HTML: result,
        }
      })
    }
    reader.readAsText(file)
  }

  const debouncedHTML = useDebounce(settings.HTML, 1000)

  return (
    <div className={cx(styles.pageContent)}>
      <HTMLHead title={settings.title} handleChange={handleChange} />

      {showTextArea ? (
        <HTMLTextArea HTML={settings.HTML} handleChange={handleChange} />
      ) : (
        <FileDropZone handleDropFile={handleDropHTML} />
      )}

      <div className={cx(styles.rightContent)}>
        <InputBase
          label={'Тема'}
          name={'theme'}
          placeholder={'Введите текст'}
          value={settings.theme}
          handleInputChange={handleChange}
          modificator={styles.input}
          type={'text'}
        />
        <InputBase
          label={'Прехедер'}
          name={'preheader'}
          placeholder={'Введите текст'}
          value={settings.preheader}
          handleInputChange={handleChange}
          modificator={styles.input}
          type={'text'}
        />
        <HTMLPreview HTML={debouncedHTML} />
      </div>
    </div>
  )
}

export default CreateHTML
