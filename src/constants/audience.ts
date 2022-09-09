import { ICreateOption } from 'types'

import { PagesData } from 'constants/url'

const createAudienceOptions: ICreateOption[] = [
  { title: 'Из CRM', url: PagesData.CONTENT_HTML.link },
  { title: 'Из готовой аудитории', url: PagesData.CONTENT_SMS.link },
  { title: 'Новая', url: PagesData.CONTENT_FILE.link },
]

enum DoctorsAction {
  EDIT = 'edit',
  DELETE = 'delete',
}

export { createAudienceOptions, DoctorsAction }
