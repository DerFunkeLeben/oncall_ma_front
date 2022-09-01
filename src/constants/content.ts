import { ContentTypes, IContent } from 'types/content'
import { getToday } from 'utils/transformDate'

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

export { INIT_HTML_CONTENT, INIT_SMS_CONTENT, ContentAction }
