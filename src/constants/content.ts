import { ICreateOption } from 'types'
import { ContentTypes, IContent } from 'types/content'
import { getToday } from 'utils/transformDate'
import { PagesData } from './url'

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

const createContentOptions: ICreateOption[] = [
  { title: 'Создать HTML', url: PagesData.CONTENT_HTML.link },
  { title: 'Создать SMS', url: PagesData.CONTENT_SMS.link },
  { title: 'Создать File', url: PagesData.CONTENT_FILE.link },
]

export { INIT_HTML_CONTENT, INIT_SMS_CONTENT, ContentAction, createContentOptions }
