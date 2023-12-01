import { Customer } from '~/domain/customer'

export function isEmpty(value: string): boolean {
  return value.toString().trim() === ''
}