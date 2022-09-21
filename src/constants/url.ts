import { IPagesData } from 'types'

const { REACT_APP_DEBUG } = process.env

export let SERVER = 'http://localhost:3000'
if (REACT_APP_DEBUG === 'true') SERVER = 'http://217.25.89.6'

export const AUTH_URL = `/auth`
export const AUTH_URL_LOGIN = `${AUTH_URL}/local/login`
export const AUTH_URL_RELOGIN = `${AUTH_URL}/local/me`

const DOCTORS_BASE_URL = '/doctors'
export const DOCTORS_URL = `${DOCTORS_BASE_URL}?limit=50&offset=0` // TODO
export const DOCTORS_URL_ADD = `${DOCTORS_BASE_URL}/add`
export const DOCTORS_URL_UPDATE = `${DOCTORS_BASE_URL}/update`

const AUDIENCE_BASE_URL = `${DOCTORS_BASE_URL}/audience`
export const AUDIENCE_URL_CREATE = `${AUDIENCE_BASE_URL}/create`
export const AUDIENCE_URL_TEST = `${AUDIENCE_BASE_URL}/test`
export const AUDIENCE_URL_ONE = `${AUDIENCE_BASE_URL}/get` // {id}
export const AUDIENCE_URL_VALID_NAME = `${AUDIENCE_BASE_URL}/valid/name` // {name}
export const AUDIENCE_URL_DELETE = `${AUDIENCE_BASE_URL}/delete`
export const AUDIENCE_URL_ALL = `${AUDIENCE_BASE_URL}/groups`
export const AUDIENCE_URL_FOLDERS = `${AUDIENCE_BASE_URL}/groups/count`
export const AUDIENCE_URL_ONE_GROUP = `${AUDIENCE_BASE_URL}/group` // {name}

export const CONTENT_URL_UPLOAD = `/comm/file`
export const CONTENT_URL_UPDATE = `${CONTENT_URL_UPLOAD}/update`
export const CONTENT_URL_ONE = `${CONTENT_URL_UPLOAD}/get` // {id}
export const CONTENT_URL_ALL = `${CONTENT_URL_UPLOAD}/files`
export const CONTENT_URL_FOLDERS = `${CONTENT_URL_UPLOAD}/groups`

export const SEND_EMAIL_URL = `/comm/mail/test`

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

export const contentRoutes = [
  '/content',
  `/content/html`,
  `/content/sms`,
  `/content/file`,
  `/content/html/:contentId`,
  `/content/sms/:contentId`,
  `/content/file/:contentId`,
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
    link: contentRoutes[0],
    route: contentRoutes,
    name: 'Контент',
  },
  CONTENT_HTML: {
    link: contentRoutes[1],
    route: contentRoutes,
    name: 'Контент',
  },
  CONTENT_SMS: {
    link: contentRoutes[2],
    route: contentRoutes,
    name: 'Контент',
  },
  CONTENT_FILE: {
    link: contentRoutes[3],
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
