import { IPagesData } from 'types'

export const audencesRoutes = ['/audences', '/audences/:audienceid', '/audences/create_new']
export const contentRoutes = ['/content', '/content/create_html']
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
  CONTENT: {
    link: contentRoutes[0],
    route: contentRoutes,
    name: 'Контент',
  },
  CREATE_HTML: {
    link: contentRoutes[1],
    route: contentRoutes,
    name: 'Контент',
  },
  ANALYTICS: {
    link: analyticsRoutes[0],
    route: analyticsRoutes,
    name: 'Аналитика',
  },
  SCENARIOS: {
    link: scenariosRoutes[0],
    route: scenariosRoutes,
    name: 'Сценарии',
  },
}
