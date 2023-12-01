export interface IValidatorResponse {
  result: boolean
  errors: string[]
}

export enum validatorTypes {
  Required = 'Required',
  Unique = 'Unique',
  ValidFormat = 'ValidFormat'
}