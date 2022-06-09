import { FC, useState } from 'react'
import { useHistory } from 'react-router-dom'

import InputBase from 'components/parts/InputBase/InputBase'
import { loginInputsData } from './loginData'
import Button from 'components/parts/Button/Button'
import logo from './img/logo.png'
import styles from './Login.module.scss'
import buttonStyles from '../../components/parts/Button/ButtonThemes.module.scss'
import Loading from 'components/parts/Loading/Loading'

import { ILoginAnswer } from './loginData'
import { PagesData } from 'constants/url'
import { useAuth } from 'store/auth/useAuth'

const Login: FC = () => {
  const [isLoading, setLoading] = useState(false)
  const [loginData, setLoginData] = useState({
    login: '',
    password: '',
  })

  const history = useHistory()
  const { setUser } = useAuth()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target

    setLoginData({ ...loginData, [name]: value })
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

    console.log(userDB)

    setUser && (await setUser(userDB))

    history.push(PagesData.AUDIENCE.link)
  }

  const onSubmitLogin = async (event: React.FormEvent) => {
    setLoading(true)
    event.preventDefault()
    try {
      const { login, password } = loginData
      const result = await fakeRequest({
        login,
        password,
      })
      loginUser(result)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.login}>
      {isLoading ? (
        <Loading color="#238afb" />
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
            modificator={styles.input_2}
          />
          <Button type="button" modificator={[buttonStyles.theme_transparent, styles.btn_1]}>
            Забыли пароль ?
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
