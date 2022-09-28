import { AlertBoxIcons } from 'constants/dictionary'
import useAlertContext from 'context/AlertContext'
import useToggle from 'hooks/useToggle'
import { useState } from 'react'
import useAuth from 'store/auth/useAuth'
import { getContentHTML, sendContentHTML } from 'utils/axiosQueries/content'

export function useSendHTMLPopup() {
  const { user } = useAuth()
  const { setAlertBox } = useAlertContext()

  const [popUpIsOpen, togglePopUp] = useToggle()
  const [emails, setEmails] = useState<string[]>([user.email])

  const sendEmails = async (settings: any) => {
    await sendContentHTML(settings, emails)
    setAlertBox({
      message: `Письмо успешно отправлено!`,
      icon: AlertBoxIcons.SUCCESS,
      isOpen: true,
    })
    togglePopUp()
  }

  const sendEmailsMany = async (ids: string[]) => {
    const promiseArr = ids.map((id) => getContentHTML(id))
    const allCheckedEmails = await Promise.all(promiseArr)

    const promiseSend = allCheckedEmails?.map((settings: any) => sendContentHTML(settings, emails))
    await Promise.all(promiseSend)

    setAlertBox({
      message: `Письма успешно отправлены!`,
      icon: AlertBoxIcons.SUCCESS,
      isOpen: true,
    })
    togglePopUp()
  }

  return {
    popUpIsOpen,
    togglePopUp,
    emails,
    setEmails,
    sendEmails,
    sendEmailsMany,
  }
}
