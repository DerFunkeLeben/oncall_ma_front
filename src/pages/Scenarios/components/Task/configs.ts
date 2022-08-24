import { SidePopupActions } from 'constants/sidePopup'
import { IAction } from 'types/sidePopup'
import { TasksTypes } from 'types'

type IConfigs = {
  [key in TasksTypes]?: IAction
}

const configs: IConfigs = {
  wait: {
    name: 'ВыборДаты',
    title: 'Выбор даты',
    type: SidePopupActions.DURATION,
  },
}
export default configs
