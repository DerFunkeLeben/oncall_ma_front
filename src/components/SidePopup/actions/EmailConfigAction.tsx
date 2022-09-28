import { FC } from 'react'

import usePopupContext from 'context/SidePopupContext'

import InputAction from './InputAction'

import { TIME_OPTIONS } from 'constants/sidePopup'

import actionsStyles from './styles.module.scss'

const EmailConfigAction: FC = () => {
  const { action, properties } = usePopupContext()
  const { name } = action
  action.options = TIME_OPTIONS
  const preset = properties?.name
  // const emailId = properties?.email?.emailId
  const emailName = 'emailName'
  const emailTitle = 'emailTitle'
  const emailSubTitle = 'emailSubTitle'

  return (
    <div className={actionsStyles.emailWrapper}>
      {/* <p>{emailName}</p>
      <InputAction label={emailTitle} stateKey={'title'} />
      <InputAction label={emailSubTitle} stateKey={'subTitle'} /> */}
    </div>
  )
}

export default EmailConfigAction
