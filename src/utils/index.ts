export function reduceBigNumbers(num: number) {
  if (num < 999) return num
  if (num > 9500) return '9K+'
  return Math.round(num / 100) / 10 + 'K'
}
