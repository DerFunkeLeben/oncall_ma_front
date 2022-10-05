import { ICreateOption } from 'types'
import { ContentTypes, IContent } from 'types/content'
import { now } from 'utils/transformDate'
import { PagesData } from './url'

const INIT_HTML_CONTENT: IContent = {
  title: `Письмо ${now()}`,
  type: ContentTypes.HTML,
  subject: '',
  preheader: '',
  HTML: undefined,
}

const INIT_SMS_CONTENT: IContent = {
  title: `SMS ${now()}`,
  type: ContentTypes.SMS,
  SMStext: '',
}

enum ContentAction {
  EDIT = 'edit',
  CREATE = 'create',
}

const createContentOptions: ICreateOption[] = [
  { title: 'Создать HTML', url: PagesData.CONTENT_HTML.link },
  // { title: 'Создать SMS', url: PagesData.CONTENT_SMS.link },
  // { title: 'Создать File', url: PagesData.CONTENT_FILE.link },
]

export { INIT_HTML_CONTENT, INIT_SMS_CONTENT, ContentAction, createContentOptions }
