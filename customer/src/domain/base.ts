export function idGenerator(n: number = 5): string {
  return Math.random().toString(36).substr(2, n)
}

export class BaseModel {
  readonly id: string
  readonly createdDate: Date

  constructor() {
    this.id = idGenerator()
    this.createdDate = new Date()
  }
}