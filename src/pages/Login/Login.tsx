import { FC, useState, FormEvent } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import cx from 'classnames'

import InputBase from 'components/parts/InputBase/InputBase'
import Button from 'components/parts/Button/Button'
import Loading from 'components/parts/Loading/Loading'

import { PagesData } from 'constants/url'
import { useAuth } from 'store/auth/useAuth'
import { ILoginAnswer, loginInputsData } from './loginData'

import logo from './img/logo.png'
import buttonStyles from 'components/parts/Button/ButtonThemes.module.scss'
import inputStyles from 'components/parts/InputBase/InputBase.module.scss'
import styles from './Login.module.scss'

const ERROR_MESSAGE =
  'Неверный пароль. Повторите попытку или нажмите на ссылку "Забыли пароль?", чтобы сбросить его.'

const Login: FC = () => {
  const [isLoading, setLoading] = useState(false)
  const [loginData, setLoginData] = useState({
    login: '',
    password: '',
  })
  const [loginError, setLoginError] = useState('')
  const { setUser } = useAuth()
  const history = useHistory()

  const user = { email: sessionStorage.getItem('user') }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target

    setLoginData({ ...loginData, [name]: value })
    if (loginError) setLoginError('')
  }

  const fakeRequest = ({ login }: { [key: string]: string }): Promise<ILoginAnswer> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ userDB: { email: login } })
      }, 1000)
    })
  }

  const loginUser = async (data: ILoginAnswer) => {
    const { userDB } = data

    setUser && (await setUser(userDB))

    history.push(PagesData.AUDIENCES.link)
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
      console.error(e)
    } finally {
      setLoading(false)
    }
  }
  if (user?.email) {
    return <Redirect to={PagesData.AUDIENCES.link} />
  }

  return (
    <div className={styles.login}>
      {isLoading ? (
        <Loading />
      ) : (
        <form className={styles.loginForm} onSubmit={onSubmitLogin}>
          <img className={styles.logo} src={logo} alt="logo" />
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
            modificator={cx(styles.input_2, {
              [inputStyles.inputError]: loginError === ERROR_MESSAGE,
            })}
          />
          <div className={cx(styles.errorMessage, 'text_05')}>{loginError}</div>

          <Button type="button" modificator={[buttonStyles.theme_additional, styles.btnForget]}>
            Забыли пароль?
          </Button>
          <Button type="submit" modificator={styles.btn_2}>
            Войти
          </Button>
        </form>
      )}
    </div>
  )
}

export default Login
