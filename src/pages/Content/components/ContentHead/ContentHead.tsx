import { FC, ChangeEvent } from 'react'
import { useHistory } from 'react-router-dom'

import PageHead from 'components/PageHead/PageHead'
import Button from 'components/parts/Button/Button'

import useCurrentContent from 'store/content/useCurrentContent'
import useSetContent from 'store/content/useSetContent'

import { IContent } from 'types/content'
import { ContentAction } from 'constants/content'
import { CONTENT_URL } from 'constants/url'

import { IconTrash, IconSend } from 'assets/icons'
import buttonStyles from 'components/parts/Button/ButtonThemes.module.scss'

const { EDIT, CREATE } = ContentAction
interface IContentHead {
  settings: IContent
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  openPopUp: () => void
}

const ContentHead: FC<IContentHead> = ({ settings, handleChange, openPopUp }) => {
  const history = useHistory()
  const { currentContent } = useCurrentContent()
  const { saveContent, createContent, deleteContent } = useSetContent()

  const { contentAction } = currentContent

  const handleSave = () => {
    console.log(contentAction)
    if (contentAction === CREATE) createContent(settings)
    else if (contentAction === EDIT) saveContent(settings)

    history.push(`${CONTENT_URL}`)
  }

  const handleDelete = () => {
    if (contentAction === EDIT) deleteContent(settings)
    else if (contentAction === CREATE) console.log('диалоговое окно и выйти')
  }

  return (
    <PageHead
      mod={true}
      titleEditable={true}
      title={settings.title}
      handleTitleChange={handleChange}
      buttonBackName="К списку всего контента"
      buttonBackUrl={CONTENT_URL}
    >
      <Button modificator={buttonStyles.theme_secondary} onClick={openPopUp}>
        <IconSend />
        <span>Отправить тестово</span>
      </Button>
      <Button modificator={buttonStyles.theme_alert} onClick={handleDelete}>
        <IconTrash />
        <span>Удалить</span>
      </Button>

      <Button onClick={handleSave}>
        <span>Сохранить</span>
      </Button>
    </PageHead>
  )
}

export default ContentHead
