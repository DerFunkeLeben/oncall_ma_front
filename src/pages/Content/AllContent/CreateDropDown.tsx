import { FC } from 'react'
import { useHistory } from 'react-router-dom'
import cx from 'classnames'

import Button from 'components/parts/Button/Button'
import DropDown from 'components/parts/DropDown/DropDown'

import { createContentOptions } from 'constants/content'
import dropDownStyles from 'components/parts/DropDown/DropDown.module.scss'

interface ICreateDropDown {
  mode?: string
  alignRight?: boolean
}

const CreateDropDown: FC<ICreateDropDown> = ({ mode, alignRight }) => {
  const history = useHistory()

  return (
    <DropDown
      alignRight={alignRight}
      triggerNode={
        <Button modificator={mode}>
          <span>Создать</span>
        </Button>
      }
    >
      <div className={dropDownStyles.container}>
        {createContentOptions.map((createOption, index) => (
          <button
            className={cx(dropDownStyles.element, 'text_1')}
            onClick={() => history.push(createOption.url)}
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
