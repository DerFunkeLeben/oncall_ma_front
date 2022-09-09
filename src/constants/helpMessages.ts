enum HelpMessages {
  // Login
  FORGOT_PASSWORD_HELP = '<p>Забыли пароль?</p> Введите свой электронный адрес. Вам на почту придет ссылка для восстановления пароля.',
  CHECK_EMAIL_MESSAGE = '<p>Проверьте почту</p> По указанному адресу  была отправлена ссылка для восстановления пароля',

  // Audiences
  EMPTY_AUDIENCES_TABLE = 'Вы еще не создали ни одной аудитории',
  EMPTY_DOCTORS_TABLE = 'Вы еще не добавили ни одного контакта',

  // Content
  EMPTY_CONTENT_TABLE = 'Вы еще не создали ни одного письма',
  DROP_FILE_CAPTION = 'Перетащите в эту область файл для загрузки',

  // Common
  EMPTY_FILTER_RESULT = 'По вашему запросу <b>не найдено</b> результатов',
  DONT_WANT_SAVE_CHANGES = `Хотите сохранить изменения<br>перед выходом?`,
}

export const SURE_WANT_DELETE_MANY = (n: number) => `Вы уверены, что хотите удалить ${n} элементов?`
export const SURE_WANT_DELETE_ONE = (name: string) => `Вы уверены, что хотите удалить ${name}?`
export const SURE_WANT_DELETE_FOLDER = (name: string | undefined) =>
  `Вы уверены, что хотите удалить папку ${name || ''}?<br><br>Данные при этом утеряны не будут`

export default HelpMessages
