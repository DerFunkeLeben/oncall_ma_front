import { ContentTypes, IContent } from 'types/content'
import { getToday } from 'utils/transformDate'
import { CONTENT_URL_FILE, CONTENT_URL_HTML, CONTENT_URL_SMS } from './url'

const INIT_HTML_CONTENT: IContent = {
  title: `Письмо ${getToday()}`,
  type: ContentTypes.HTML,
  theme: '',
  preheader: '',
  HTML: undefined,
}

const INIT_SMS_CONTENT: IContent = {
  title: `SMS ${getToday()}`,
  type: ContentTypes.SMS,
  text: '',
}

enum ContentAction {
  EDIT = 'edit',
  CREATE = 'create',
}

const createContentOptions = [
  { title: 'Создать HTML', url: CONTENT_URL_HTML },
  { title: 'Создать SMS', url: CONTENT_URL_SMS },
  { title: 'Создать File', url: CONTENT_URL_FILE },
]

export { INIT_HTML_CONTENT, INIT_SMS_CONTENT, ContentAction, createContentOptions }
