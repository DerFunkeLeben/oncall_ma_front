import { FC } from 'react'
import { useHistory } from 'react-router-dom'
import cx from 'classnames'

import Button from 'components/parts/Button/Button'
import DropDown from 'components/parts/DropDown/DropDown'

import { Align } from 'constants/dictionary'
import { ICreateOption } from 'types'

import dropDownStyles from 'components/parts/DropDown/DropDown.module.scss'

interface ICreateDropDown {
  createOptions: ICreateOption[]
  align: Align
  btnTitle?: string
  mode?: string
}

const CreateDropDown: FC<ICreateDropDown> = ({
  mode,
  align,
  createOptions,
  btnTitle = 'Создать',
}) => {
  const history = useHistory()

  const handleClick = (createOption: ICreateOption) => {
    if (createOption.url) history.push(createOption.url)
    else createOption?.action?.()
  }

  return (
    <DropDown
      align={align}
      triggerNode={
        <Button modificator={mode}>
          <span>{btnTitle}</span>
        </Button>
      }
    >
      <div className={dropDownStyles.container}>
        {createOptions.map((createOption, index) => (
          <button
            className={cx(dropDownStyles.element, 'text_1')}
            onClick={() => handleClick(createOption)}
            key={index}
          >
            {createOption.title}
          </button>
        ))}
      </div>
    </DropDown>
  )
}

export default CreateDropDown
