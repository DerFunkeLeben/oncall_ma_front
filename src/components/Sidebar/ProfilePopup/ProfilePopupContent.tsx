import { FC, ChangeEvent, Dispatch, SetStateAction } from 'react'
import cx from 'classnames'

import Button from 'components/parts/Button/Button'
import InputBase from 'components/parts/InputBase/InputBase'
import ScrollArea from 'containers/ScrollArea/ScrollArea'

import buttonThemes from 'components/parts/Button/ButtonThemes.module.scss'
import styles from './ProfilePopup.module.scss'

interface IProfilePopupContent {
  inputsState: { [key: string]: string }
  setInputsState: Dispatch<SetStateAction<{ [key: string]: string }>>
  editableBlock: number
  setEditableBlock: Dispatch<SetStateAction<number>>
}

const ProfilePopupContent: FC<IProfilePopupContent> = ({
  inputsState,
  setInputsState,
  editableBlock,
  setEditableBlock,
}) => {
  const config = [
    [
      { label: 'ФИО', name: 'fio' },
      { label: 'Должность', name: 'job' },
    ],
    [
      { label: 'Электронная почта', name: 'email' },
      { label: 'Номер телефона', name: 'phone' },
    ],
  ]

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setInputsState((prevState) => ({ ...prevState, [name]: value }))
  }

  const isEditable = editableBlock !== -1

  return (
    <ScrollArea modificator={styles.scrollWrapper}>
      {config.map((block, index) => {
        return (
          <div className={styles.oneBlockWrapper} key={index}>
            {block.map((input, inputIndex) => {
              const { label, name } = input
              const value = inputsState[name]
              return (
                <div className={styles.oneInputWrapper} key={inputIndex}>
                  <div className={cx(styles.label, 'text_05')}>{label}</div>
                  <InputBase
                    modificator={cx(styles.input, {
                      [styles.inputDisabled]: !isEditable,
                    })}
                    wrapperModificator={styles.inputWrapper}
                    key={index}
                    name={name}
                    value={value}
                    handleInputChange={handleInputChange}
                  />
                </div>
              )
            })}
          </div>
        )
      })}
    </ScrollArea>
  )
}

export default ProfilePopupContent
