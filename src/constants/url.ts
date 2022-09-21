import { IPagesData } from 'types'

const { REACT_APP_DEBUG } = process.env

export let SERVER = 'http://localhost:3000'
if (REACT_APP_DEBUG === 'true') SERVER = 'http://217.25.89.6'

export const AUTH_URL = `/auth`
export const AUTH_URL_LOGIN = `${AUTH_URL}/local/login`
export const AUTH_URL_RELOGIN = `${AUTH_URL}/local/me`

const DOCTORS_BASE_URL = '/doctors'
export const DOCTORS_URL = `${DOCTORS_BASE_URL}?limit=20&offset=0`
export const DOCTORS_URL_ADD = `${DOCTORS_BASE_URL}/add`
export const DOCTORS_URL_UPDATE = `${DOCTORS_BASE_URL}/update`

export const AUDIENCE_URL = `${DOCTORS_BASE_URL}/audience`
export const AUDIENCE_URL_CREATE = `${AUDIENCE_URL}/create`
export const AUDIENCE_URL_ALL = `${AUDIENCE_URL}/groups`
export const AUDIENCE_URL_ONE = `${AUDIENCE_URL}/get`
export const AUDIENCE_URL_ONE_GROUP = `${AUDIENCE_URL}/group`

export const EVENT_URL = `/events/event`
export const EVENT_URL_ADD = `${EVENT_URL}/add`
export const EVENT_URL_ALL = `${EVENT_URL}/all`
export const EVENT_URL_VALIDATE = `${EVENT_URL}/validate`
export const EVENT_URL_START = `${EVENT_URL}/start/`

export const audiencesRoutes = [
  '/audiences',
  '/audiences/:audienceid',
  '/audiences/create_new',
  '/audiences/create_crm',
]

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
export const CREATE_SCENARIO = '/create_scenario'
export const scenariosRoutes = ['/scenarios', CREATE_SCENARIO, `${CREATE_SCENARIO}/:eventId`]

export const PagesData: IPagesData = {
  LOGIN: {
    link: '/',
    route: ['/'],
    name: 'Логин',
  },
  AUDIENCES: {
    link: audiencesRoutes[0],
    route: audiencesRoutes,
    name: 'Аудитории',
  },
  AUDIENCE: {
    link: audiencesRoutes[1],
    route: audiencesRoutes,
    name: 'Аудитория',
  },
  CREATE_AUDIENCE: {
    link: audiencesRoutes[2],
    route: audiencesRoutes,
    name: 'Аудитория',
  },
  CREATE_AUDIENCE_CRM: {
    link: audiencesRoutes[3],
    route: audiencesRoutes,
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
    name: 'Аналитика',
  },
  CREATE_SCENARIOS: {
    link: scenariosRoutes[1],
    route: scenariosRoutes,
    name: 'Создание сценария',
  },
  SCENARIOS: {
    link: scenariosRoutes[0],
    route: scenariosRoutes,
    name: 'Сценарии',
  },
  ERROR404: {
    link: '/404',
    route: ['/404'],
    name: 'Not found ',
  },
}
