import { FC, FormEvent, ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import cx from 'classnames'

import Button from 'components/parts/Button/Button'
import InputBase from 'components/parts/InputBase/InputBase'
import ValidationError from 'constants/ValidationError'
import HelpMessages from 'constants/helpMessages'
import { loginInputsData } from 'types/login'

import inputStyles from 'components/parts/InputBase/InputBase.module.scss'
import styles from './Login.module.scss'

const ForgotPassword: FC<IForgotPassword> = ({
  login,
  loginError,
  setLoginError,
  handleInputChange,
}) => {
  const [emailSent, setEmailSent] = useState<boolean>(false)

  const onSubmitForgotPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      // const result = await postAxiosSingle(`${AUTH_URL_LOGIN}`, {}, { login })
      // TODO: send email
      setEmailSent(true)
    } catch (e) {
      setLoginError(ValidationError.USER_DOESNT_EXISTS)
      console.error(e)
    }
  }

  if (emailSent) {
    return (
      <form className={styles.loginForm}>
        <div
          className={cx(styles.helpCaption, 'text_1')}
          dangerouslySetInnerHTML={{ __html: HelpMessages.CHECK_EMAIL_MESSAGE }}
        />
      </form>
    )
  }

  return (
    <form className={styles.loginForm} onSubmit={onSubmitForgotPassword}>
      <div
        className={cx(styles.helpCaption, 'text_1')}
        dangerouslySetInnerHTML={{ __html: HelpMessages.FORGOT_PASSWORD_HELP }}
      />

      <InputBase
        {...loginInputsData.LOGIN}
        value={login}
        handleInputChange={handleInputChange}
        modificator={cx(styles.input_1, styles.input_1_forgot, {
          [inputStyles.inputError]: loginError,
        })}
      />

      <div className={cx(styles.errorMessage, 'text_05')}>{loginError}</div>

      <Button type="submit" modificator={styles.btn_2}>
        Отправить
      </Button>
    </form>
  )
}

interface IForgotPassword {
  login: string
  loginError: string
  setLoginError: Dispatch<SetStateAction<string>>
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default ForgotPassword
