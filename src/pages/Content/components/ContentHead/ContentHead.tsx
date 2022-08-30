import { FC, ChangeEvent } from 'react'

import PageHead from 'components/PageHead/PageHead'
import Button from 'components/parts/Button/Button'

import { IconTrash, IconSend } from 'assets/icons'
import { CONTENT_URL } from 'constants/url'

import buttonStyles from 'components/parts/Button/ButtonThemes.module.scss'

interface IContentHead {
  title: string
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  openPopUp: () => void
}

const ContentHead: FC<IContentHead> = ({ title, handleChange, openPopUp }) => {
  return (
    <PageHead
      mod={true}
      titleEditable={true}
      title={title}
      handleTitleChange={handleChange}
      buttonBackName="К списку всего контента"
      buttonBackUrl={CONTENT_URL}
    >
      <Button modificator={buttonStyles.theme_secondary} onClick={openPopUp}>
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

export default ContentHead
