export interface IValidatorResponse {
  result: boolean
  errors: string[]
}

export enum validatorTypes {
  Required = 'Required',
  NotEmpty = 'NotEmpty',
  ValidFormat = 'ValidFormat'
}