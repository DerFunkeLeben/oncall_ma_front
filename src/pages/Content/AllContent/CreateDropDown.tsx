import { FC } from 'react'
import { useHistory } from 'react-router-dom'
import cx from 'classnames'

import Button from 'components/parts/Button/Button'
import DropDown from 'components/parts/DropDown/DropDown'

import { CONTENT_URL_HTML, CONTENT_URL_SMS, CONTENT_URL_FILE } from 'constants/url'
import dropDownStyles from 'components/parts/DropDown/DropDown.module.scss'

interface ICreateDropDown {
  mode?: string
  alignRight?: boolean
}

const createOptions = [
  { title: 'Создать HTML', url: CONTENT_URL_HTML },
  { title: 'Создать SMS', url: CONTENT_URL_SMS },
  { title: 'Создать File', url: CONTENT_URL_FILE },
]

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
        {createOptions.map((createOption, index) => (
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
