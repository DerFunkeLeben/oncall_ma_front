import { FC, useState, FormEvent, ChangeEvent, Dispatch, SetStateAction } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import cx from 'classnames'

import InputBase from 'components/parts/InputBase/InputBase'
import Button from 'components/parts/Button/Button'

import { PagesData } from 'constants/url'
import { useAuth } from 'store/auth/useAuth'
import { ILoginAnswer, loginInputsData } from 'types/login'

import { IconPasswordHide, IconPasswordShow } from 'assets/icons'
import inputStyles from 'components/parts/InputBase/InputBase.module.scss'
import styles from './Login.module.scss'

const ERROR_MESSAGE =
  'Неверный пароль. Повторите попытку или нажмите на ссылку "Забыли пароль?", чтобы сбросить его.'

const LoginForm: FC<ILoginForm> = ({
  loginData,
  setLoginData,
  handleInputChange,
  setForgotPassword,
  loginError,
  setLoginError,
  setLoading,
}) => {
  const [passwordShown, setPasswordShown] = useState(false)
  const togglePassword = () => setPasswordShown(!passwordShown)
  const clearPassword = () => setLoginData({ ...loginData, password: '' })

  const { setUser } = useAuth()
  const history = useHistory()
  const user = { email: sessionStorage.getItem('user') }

  if (user?.email) {
    return <Redirect to={PagesData.AUDIENCES.link} />
  }

  const loginUser = async (data: ILoginAnswer) => {
    const { userDB } = data

    setUser && (await setUser(userDB))

    history.push(PagesData.AUDIENCES.link)
  }

  const fakeRequest = ({ login }: { [key: string]: string }): Promise<ILoginAnswer> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ userDB: { email: login } })
      }, 1000)
    })
  }

  const onSubmitLogin = async (event: FormEvent<HTMLFormElement>) => {
    setLoading(true)
    event.preventDefault()
    try {
      const { login, password } = loginData
      const result = await fakeRequest({
        login,
        password,
      })
      await loginUser(result)
    } catch (e) {
      setLoginError(ERROR_MESSAGE)
      clearPassword()
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={styles.loginForm} onSubmit={onSubmitLogin}>
      <InputBase
        {...loginInputsData.LOGIN}
        value={loginData.login}
        handleInputChange={handleInputChange}
        modificator={styles.input_1}
      />

      <InputBase
        {...loginInputsData.PASSWORD}
        value={loginData.password}
        handleInputChange={handleInputChange}
        wrapperModificator={styles.password_wrapper}
        type={passwordShown ? 'text' : 'password'}
        modificator={cx(styles.input_2, {
          [inputStyles.inputError]: loginError,
        })}
      >
        {passwordShown ? (
          <IconPasswordHide onClick={togglePassword} />
        ) : (
          <IconPasswordShow onClick={togglePassword} />
        )}
      </InputBase>

      <div className={cx(styles.errorMessage, 'text_05')}>{loginError}</div>

      <Button type="button" onClick={() => setForgotPassword(true)} modificator={styles.btnForget}>
        Забыли пароль?
      </Button>
      <Button type="submit" modificator={styles.btn_2}>
        Войти
      </Button>
    </form>
  )
}

interface ILoginForm {
  loginData: any
  setLoginData: Dispatch<SetStateAction<any>>
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void
  setForgotPassword: Dispatch<SetStateAction<boolean>>
  setLoading: Dispatch<SetStateAction<boolean>>
  setLoginError: Dispatch<SetStateAction<string>>
  loginError: string
}

export default LoginForm
