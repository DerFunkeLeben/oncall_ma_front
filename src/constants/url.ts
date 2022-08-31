import { IPagesData } from 'types'

export const Config = {
  HEADERS: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  MULTIPART_HEADERS: { 'Content-Type': 'multipart/form-data; charset= utf-8; boundary=---sad' },
}

export const audencesRoutes = ['/audences', '/audences/:audienceid', '/audences/create_new']

export const CONTENT_URL = '/content'
export const CONTENT_URL_HTML = `${CONTENT_URL}/html`
export const CONTENT_URL_SMS = `${CONTENT_URL}/sms`
export const CONTENT_URL_FILE = `${CONTENT_URL}/file`

export const contentRoutes = [
  CONTENT_URL,
  CONTENT_URL_HTML,
  CONTENT_URL_SMS,
  CONTENT_URL_FILE,
  `${CONTENT_URL_HTML}/:contentId`,
  `${CONTENT_URL_SMS}/:contentId`,
  `${CONTENT_URL_FILE}/:contentId`,
]

export const analyticsRoutes = ['/analytics']
export const scenariosRoutes = ['/scenarios']

export const PagesData: IPagesData = {
  LOGIN: {
    link: '/',
    route: ['/'],
    name: 'Логин',
  },
  AUDIENCES: {
    link: audencesRoutes[0],
    route: audencesRoutes,
    name: 'Аудитории',
  },
  AUDIENCE: {
    link: audencesRoutes[1],
    route: audencesRoutes,
    name: 'Аудитория',
  },
  CREATE_AUDIENCE: {
    link: audencesRoutes[2],
    route: audencesRoutes,
    name: 'Аудитория',
  },
  ALL_CONTENT: {
    link: CONTENT_URL,
    route: contentRoutes,
    name: 'Контент',
  },
  CONTENT_HTML: {
    link: CONTENT_URL_HTML,
    route: contentRoutes,
    name: 'Контент',
  },
  CONTENT_SMS: {
    link: CONTENT_URL_SMS,
    route: contentRoutes,
    name: 'Контент',
  },
  CONTENT_FILE: {
    link: CONTENT_URL_FILE,
    route: contentRoutes,
    name: 'Контент',
  },
  CONTENT_HTML_VIEW: {
    link: contentRoutes[4],
    route: contentRoutes,
    name: 'Контент',
  },
  CONTENT_SMS_VIEW: {
    link: contentRoutes[5],
    route: contentRoutes,
    name: 'Контент',
  },
  CONTENT_FILE_VIEW: {
    link: contentRoutes[6],
    route: contentRoutes,
    name: 'Контент',
  },
  ANALYTICS: {
    link: analyticsRoutes[0],
    route: analyticsRoutes,
    name: 'Раздел в разработке',
  },
  SCENARIOS: {
    link: scenariosRoutes[0],
    route: scenariosRoutes,
    name: 'Сценарии',
  },
}
