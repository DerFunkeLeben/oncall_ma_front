import { IUser } from 'types'

interface ILoginInputData {
  id: string
  label: string
  type: string
  width: string
  placeholder: string
  name: string
  required: boolean
}

export const loginInputsData: { [key: string]: ILoginInputData } = {
  LOGIN: {
    id: 'login-input',
    label: '',
    type: 'email',
    width: '100%',
    placeholder: 'Логин',
    name: 'login',
    required: true,
  },
  PASSWORD: {
    id: 'password-input',
    label: '',
    type: 'password',
    width: '100%',
    placeholder: 'Пароль',
    name: 'password',
    required: true,
  },
}

export interface ILoginAnswer {
  userDB: IUser
}
