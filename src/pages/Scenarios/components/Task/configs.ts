import { SidePopupActions } from 'constants/sidePopup'
import { ISidePopupStep } from 'types/sidePopup'
import { TasksTypes } from 'types'

type IConfigs = {
  [key in TasksTypes]?: ISidePopupStep
}

const configs: IConfigs = {
  wait: {
    name: 'duration',
    title: 'Выбор даты',
    type: SidePopupActions.DURATION,
  },
  email: {
    name: 'email',
    title: 'Email',
    type: SidePopupActions.TABLE,
    url: 'urlToEmails',
    getNextStep: () => {
      return {
        name: 'email',
        type: SidePopupActions.EMAIL,
      }
    },
  },
  sms: {
    name: 'sms',
    title: 'SMS',
    type: SidePopupActions.TABLE,
    url: 'urlToSMSes',
    getNextStep: () => {
      return {
        name: 'sms',
        type: SidePopupActions.TEXTAREA,
        subtitle: 'name',
        text: 'text',
        label: 'Текст',
      }
    },
  },
}

export default configs
