import { FC } from 'react'
import { useHistory } from 'react-router-dom'
import cx from 'classnames'

import Button from 'components/parts/Button/Button'
import DropDown from 'components/parts/DropDown/DropDown'

import dropDownStyles from 'components/parts/DropDown/DropDown.module.scss'
import { ICreateOption } from 'types'

interface ICreateDropDown {
  createOptions: ICreateOption[]
  btnTitle?: string
  mode?: string
  alignRight?: boolean
}

const CreateDropDown: FC<ICreateDropDown> = ({
  mode,
  alignRight,
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
      alignRight={alignRight}
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
