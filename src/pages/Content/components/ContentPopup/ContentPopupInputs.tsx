import { FC, ChangeEvent, Dispatch, SetStateAction } from 'react'
import cx from 'classnames'

import Button from 'components/parts/Button/Button'
import InputBase from 'components/parts/InputBase/InputBase'
import ScrollArea from 'containers/ScrollArea/ScrollArea'

import { IconPlus, IconTrash } from 'assets/icons'

import buttonThemes from 'components/parts/Button/ButtonThemes.module.scss'
import styles from './ContentPopup.module.scss'

interface IContentPopupInputs {
  subtitle: string
  placeholder: string
  btnAddText: string
  inputsState: string[]
  setInputsState: Dispatch<SetStateAction<string[]>>
}

const ContentPopupInputs: FC<IContentPopupInputs> = ({
  subtitle,
  placeholder,
  btnAddText,
  inputsState,
  setInputsState,
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setInputsState((prevState) => prevState.map((prev, i) => (i === +name ? value : prev)))
  }

  const handleInputDelete = (event: any) => {
    const { index } = event.target.dataset
    setInputsState((prevState) => prevState.filter((_, i) => i !== +index))
  }

  const handleAddInput = () => {
    setInputsState((prevState) => [...prevState, ''])
  }

  return (
    <ScrollArea modificator={styles.scrollWrapper}>
      {inputsState.map((input, index) => {
        const firstInput = index === 0
        return (
          <InputBase
            modificator={styles.input}
            wrapperModificator={styles.inputWrapper}
            label={firstInput ? subtitle : undefined}
            key={index}
            name={`${index}`}
            value={input}
            handleInputChange={handleInputChange}
            placeholder={placeholder}
          >
            <IconTrash onClick={handleInputDelete} data-index={index} />
          </InputBase>
        )
      })}
      <Button modificator={cx(buttonThemes.theme_additional)} onClick={handleAddInput}>
        <IconPlus />
        <span>{btnAddText}</span>
      </Button>
    </ScrollArea>
  )
}

export default ContentPopupInputs
