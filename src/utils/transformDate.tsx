export function ddmmyyyy(dateIn: Date | string | undefined) {
  if (typeof dateIn === 'undefined') return ''
  if (typeof dateIn === 'string') dateIn = new Date(dateIn)

  const yyyy = dateIn.getFullYear()
  const mm = (dateIn.getMonth() + 1).toString().padStart(2, '0')
  const dd = dateIn.getDate().toString().padStart(2, '0')

  return `${dd}.${mm}.${yyyy}`
}

export function getToday() {
  const today = new Date()
  const dd = String(today.getDate()).padStart(2, '0')
  const mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
  const yyyy = today.getFullYear()

  return `${dd}.${mm}.${yyyy}`
}

export function now() {
  const today = new Date()
  const hours = String(today.getHours()).padStart(2, '0')
  const mins = String(today.getMinutes()).padStart(2, '0')
  return `${getToday()} ${hours}:${mins}`
}
