import { FC, ChangeEvent } from 'react'

import PageHead from 'components/PageHead/PageHead'
import Button from 'components/parts/Button/Button'

import { IconTrash, IconSend } from 'assets/icons'

import buttonStyles from 'components/parts/Button/ButtonThemes.module.scss'

interface IHTMLHead {
  title: string
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const HTMLHead: FC<IHTMLHead> = ({ title, handleChange }) => {
  return (
    <PageHead
      mod={true}
      titleEditable={true}
      title={title}
      handleTitleChange={handleChange}
      buttonBackName="К списку всего контента"
      buttonBackUrl="/content"
    >
      <Button modificator={buttonStyles.theme_secondary}>
        <IconSend />
        <span>Отправить тестово</span>
      </Button>
      <Button modificator={buttonStyles.theme_alert}>
        <IconTrash />
        <span>Удалить</span>
      </Button>

      <Button>
        <span>Сохранить</span>
      </Button>
    </PageHead>
  )
}

export default HTMLHead
