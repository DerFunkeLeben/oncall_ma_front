import { IPagesData } from 'types'

export const audencesRoutes = ['/audences', '/audences/:audienceid']
export const contentRoutes = ['/content']
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
  CONTENT: {
    link: contentRoutes[0],
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
