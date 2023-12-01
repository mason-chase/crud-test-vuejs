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
    const errors: string[] = []
    const properties: (keyof Customer)[] = ['firstName', 'lastName', 'email', 'dateOfBirth']

    properties.forEach(property => {

      if (customers.some((x: Customer) => x[property] === customer[property]))
        errors.push(this.messageGenerator(property, validatorTypes.Unique))
    })

    return {
      result: errors.length === 0,
      errors
    }
  }

  /**
   * Checks given Customer's properties not to be empty.
   */
  validateNotEmpty(customer: Customer): IValidatorResponse {
    const errors: string[] = []

    for (const [key, value] of Object.entries(customer))
      if (!['id', 'createdDate'].includes(key) && isEmpty(value))
        errors.push(this.messageGenerator(key, validatorTypes.Required))

    return {
      result: errors.length === 0,
      errors
    }
  }

  /**
   * Checks given Customer's bankAccountNumber to be a valid format.
   */
  validateBankAccount(customer: Customer): IValidatorResponse {
    const bankNumberRegex = /^4[0-9]{12}(?:[0-9]{3})?$/
    const errors = []

    if (customer.bankAccountNumber && !bankNumberRegex.test(customer.bankAccountNumber))
      errors.push(this.messageGenerator('bankAccountNumber', validatorTypes.ValidFormat))

    return {
      result: errors.length === 0,
      errors
    }
  }

  /**
   * Checks given Customer's validatePhoneNumber to be a valid format.
   */
  validatePhoneNumber(customer: Customer): IValidatorResponse {
    const phoneNumberRegex = /\+?1?\s*\(?-*\.*(\d{3})\)?\.*-*\s*(\d{3})\.*-*\s*(\d{4})$/
    const errors = []

    if (customer.phoneNumber && !phoneNumberRegex.test(customer.phoneNumber))
      errors.push(this.messageGenerator('phoneNumber', validatorTypes.ValidFormat))


    return {
      result: errors.length === 0,
      errors
    }
  }

  /**
   * Checks given Customer's validateEmail to be a valid format.
   */
  validateEmail(customer: Customer): IValidatorResponse {
    const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    const errors = []

    if (customer.email && !emailRegex.test(customer.email))
      errors.push(this.messageGenerator('email', validatorTypes.ValidFormat))

    return {
      result: errors.length === 0,
      errors
    }
  }

  /**
   * Checks given Customer's validateEmail to be a valid format.
   */
  messageGenerator(field: string, type: validatorTypes): string {

    switch (type) {
      case validatorTypes.Required:
        return `${field} is required.`
      case validatorTypes.Unique:
        return `${field} should be unique.`
      case validatorTypes.ValidFormat:
        return `${field} is not in a valid format.`

      default:
        return ''
    }

  }
}