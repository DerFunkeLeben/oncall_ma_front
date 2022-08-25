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
}

export default configs
