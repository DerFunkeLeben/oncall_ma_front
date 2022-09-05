import { FC, ChangeEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'

import PageHead from 'components/PageHead/PageHead'
import Button from 'components/parts/Button/Button'

import useAlertContext from 'context/AlertContext'
import useMessageBoxContext from 'context/MessageBoxContext'
import useDidUpdateEffect from 'hooks/useDidUpdateEffect'
import useCurrentContent from 'store/content/useCurrentContent'
import useSetContent from 'store/content/useSetContent'
import useParamSelector from 'hooks/useParamSelector'
import { getTitleMatch } from 'store/content/selectors'

import { IContent } from 'types/content'
import { AlertBoxIcons } from 'constants/dictionary'
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
  const { setAlertBox } = useAlertContext()
  const { setMessageBox } = useMessageBoxContext()

  const [contentChanged, setContentChanged] = useState(false)

  const { contentAction } = currentContent
  const titleAlreadyExists = useParamSelector(getTitleMatch, settings.title)

  const handleSave = () => {
    const notCurrentContentTitle = titleAlreadyExists?.id !== currentContent.content?.id
    const needMessageBox = titleAlreadyExists && notCurrentContentTitle
    if (needMessageBox)
      return setMessageBox({
        isOpen: true,
        title: `Файл с таким именем уже <br> существует`,
        buttons: ['Ок'],
      })

    if (contentAction === CREATE) createContent(settings)
    else if (contentAction === EDIT) saveContent(settings)

    history.push(`${CONTENT_URL}`)
  }

  const handleDelete = () => {
    if (contentAction === EDIT) deleteContent(settings)

    setAlertBox({
      message: `${settings.title} удален`,
      icon: AlertBoxIcons.DELETE,
      isOpen: true,
    })

    history.push(`${CONTENT_URL}`)
  }

  const showMessageBoxDelete = () =>
    setMessageBox({
      isOpen: true,
      handleConfirm: handleDelete,
      title: `Вы уверены, что хотите удалить контент ${settings.title}?`,
      buttons: ['Отмена', 'Удалить'],
    })

  useDidUpdateEffect(() => setContentChanged(true), [settings])

  return (
    <PageHead
      mod={true}
      titleEditable={true}
      title={settings.title}
      handleTitleChange={handleChange}
      buttonBackName="К списку всего контента"
      buttonBackUrl={CONTENT_URL}
      buttonBackMessageBox={contentChanged}
    >
      <Button modificator={buttonStyles.theme_secondary} onClick={openPopUp}>
        <IconSend />
        <span>Отправить тестово</span>
      </Button>
      <Button modificator={buttonStyles.theme_alert} onClick={showMessageBoxDelete}>
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
