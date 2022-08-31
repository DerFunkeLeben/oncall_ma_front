import { FC, useState, ChangeEvent } from 'react'

import Loading from 'components/parts/Loading/Loading'
import ForgotPassword from './ForgotPassword'
import LoginForm from './LoginForm'

import logo from './img/logo.png'
import styles from './Login.module.scss'

const Login: FC = () => {
  const [isLoading, setLoading] = useState(false)
  const [forgotPassword, setForgotPassword] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [loginData, setLoginData] = useState({
    login: '',
    password: '',
  })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target

    setLoginData({ ...loginData, [name]: value })
    if (loginError) setLoginError('')
  }

  if (isLoading) {
    return (
      <div className={styles.login}>
        <Loading />
      </div>
    )
  }

  return (
    <div className={styles.login}>
      <img className={styles.logo} src={logo} alt="logo" />
      {!forgotPassword ? (
        <LoginForm
          {...{
            loginData,
            setLoginData,
            handleInputChange,
            setForgotPassword,
            loginError,
            setLoginError,
            setLoading,
          }}
        />
      ) : (
        <ForgotPassword
          {...{
            login: loginData.login,
            handleInputChange,
            loginError,
            setLoginError,
          }}
        />
      )}
    </div>
  )
}

export default Login
