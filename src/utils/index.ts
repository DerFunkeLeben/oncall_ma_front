export function reduceBigNumbers(num: number) {
  if (num < 999) return num
  if (num > 9500) return '9K+'
  return Math.round(num / 100) / 10 + 'K'
}

export const getIds = (all: any[]) => all.map(({ id }) => id) as string[]

const getCookie = (name: string) =>
  document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''

export const getToken = () => getCookie('TK')
export const setToken = (token: string) => (document.cookie = `TK=${token}`)
