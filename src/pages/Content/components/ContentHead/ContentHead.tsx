import { FC, ChangeEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'

import PageHead from 'components/PageHead/PageHead'
import Button from 'components/parts/Button/Button'

import useAlertContext from 'context/AlertContext'
import useMessageBoxContext from 'context/MessageBoxContext'
import useDidUpdateEffect from 'hooks/useDidUpdateEffect'
import useCurrentContent from 'store/content/useCurrentContent'
import useSetContent from 'store/content/useSetContent'

import { IContent } from 'types/content'
import { PagesData } from 'constants/url'
import { AlertBoxIcons } from 'constants/dictionary'
import { ContentAction } from 'constants/content'
import { SURE_WANT_DELETE_ONE } from 'constants/helpMessages'

import { IconTrash, IconSend } from 'assets/icons'
import buttonStyles from 'components/parts/Button/ButtonThemes.module.scss'

const { EDIT, CREATE } = ContentAction

interface IContentHead {
  settings: IContent
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  openPopUp: () => void
  handleSave: () => void
}

const ContentHead: FC<IContentHead> = ({ settings, handleChange, openPopUp, handleSave }) => {
  const history = useHistory()
  const { currentContent } = useCurrentContent()
  const { deleteContent } = useSetContent()
  const { setAlertBox } = useAlertContext()
  const { setMessageBox } = useMessageBoxContext()

  const [contentChanged, setContentChanged] = useState(false)

  const { contentAction } = currentContent

  const handleDelete = () => {
    if (contentAction === EDIT) deleteContent(settings)

    setAlertBox({
      message: `${settings.title} удален`,
      icon: AlertBoxIcons.DELETE,
      isOpen: true,
    })

    history.push(PagesData.ALL_CONTENT.link)
  }

  const showMessageBoxDelete = () =>
    setMessageBox({
      isOpen: true,
      handleConfirm: handleDelete,
      title: SURE_WANT_DELETE_ONE(settings.title),
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
      buttonBackUrl={PagesData.ALL_CONTENT.link}
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
