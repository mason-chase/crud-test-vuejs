/**
 * Deeply clone nested objects/arrays.
 */
export function cloneDeep<T>(data: T | T[]): T | T[] {
  return JSON.parse(JSON.stringify(data))
}