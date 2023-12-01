import { Customer } from '~/domain/customer'
import { IValidatorResponse, validatorTypes } from '~/infrastructure/interfaces/plugins/validator'

export function isEmpty(value: string): boolean {
  return value.toString().trim() === ''
}

export default class CustomerValidator {

  /**
   * Checks given Customer's properties uniqueness.
   * Unique Fields: firstName, lastName, dateOfBirth, email
   */
  validateUnique(customers: Customer[], customer: Customer): IValidatorResponse {
  }

  /**
   * Checks given Customer's properties not to be empty.
   */
  validateNotEmpty(customer: Customer): IValidatorResponse {
  }

  /**
   * Checks given Customer's bankAccountNumber to be a valid format.
   */
  validateBankAccount(customer: Customer): IValidatorResponse {
  }

  /**
   * Checks given Customer's validatePhoneNumber to be a valid format.
   */
  validatePhoneNumber(customer: Customer): IValidatorResponse {
  }

  /**
   * Checks given Customer's validateEmail to be a valid format.
   */
  validateEmail(customer: Customer): IValidatorResponse {
  }

  /**
   * Checks given Customer's validateEmail to be a valid format.
   */
  messageGenerator(field: string, type: validatorTypes): string { }
}