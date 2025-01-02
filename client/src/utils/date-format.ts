import dateFormat from 'dateformat'

export function defaultDateFormat(date: Date | string): string {
  return dateFormat(date, 'mmmm dd, yyyy')
}
