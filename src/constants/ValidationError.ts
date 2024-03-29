enum ValidationError {
  // Login
  WRONG_PASSWORD = 'Неверный пароль. Повторите попытку или нажмите на ссылку "Забыли пароль?", чтобы сбросить его.',
  USER_DOESNT_EXISTS = 'Пользователь с таким адресом не зарегистрирован',
  // Audiences
  AUDIENCE_ALREADY_EXISTS = `Аудитория с таким именем уже <br> существует`,
  FILTERS_NOT_SET = `Для создания аудитории необходимо настроить фильтры`,
  // Content
  FILE_ALREADY_EXISTS = `Файл с таким именем уже <br> существует`,
  // common
  FOLDER_ALREADY_EXISTS = 'Папка с таким именем уже существует',
  FOLDER_NO_NAME = 'Нельзя создать папку без имени',
}

export default ValidationError
