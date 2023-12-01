import { defineStore } from 'pinia'
import { Customer } from '~/domain/customer'
import { IValidatorResponse, validatorTypes } from '~/infrastructure/interfaces/plugins/validator'
import Validator from '~/infrastructure/plugins/validator'

export const useCustomerStore = defineStore('customer', {

  state: () => ({
    customers: [] as Customer[],
  }),

  actions: {
    /**
     * Clears store states.
     */
    clear() {
      this.$reset()
    },
    /**
     * Creates given customer
     */
    create(customer: Customer) {
      this.customers.push(customer)
    },
    /**
     * Deletes customer if possible return value indicates deletion state if possible true will be returned. 
     */
    delete(id: string): boolean {
      const index = this.customers.findIndex((x: Customer) => x.id === id)

      if (index === -1)
        return false

      this.customers.splice(index, 1)
      return true
    },
    /**
     * Updates given customer 
     */
    update(customer: Customer): Customer {
      const index = this.customers.findIndex((x: Customer) => x.id === customer.id)
      this.customers[index] = customer
      return this.customers[index]
    },
    /**
     * Validates given customer true will be returned if customer is valid.
     * Validation rules are: firstName, LastName, DateOfBirth, email to be unique in store and valid mobile number is given
     */
    validate(customer: Customer): IValidatorResponse {
      const validator = new Validator()
      let errors: string[] = []

      const validateNotEmpty = validator.validateNotEmpty(customer)

      if (!validateNotEmpty.result)
        return {
          result: false,
          errors: validateNotEmpty.errors
        }

      errors = errors.concat(validator.validateUnique(this.customers, customer).errors)
      errors = errors.concat(validator.validateEmail(this.customers).errors)
      errors = errors.concat(validator.validateBankAccount(this.customers).errors)
      errors = errors.concat(validator.validatePhoneNumber(this.customers).errors)

      return {
        result: errors.length === 0,
        errors: errors
      }
    }
  },
  getters: {
    /**
     * Returns all customers
     */
    all(state) {
      return state.customers
    },
    /**
     * Returns customer by given id if customer is not found null will be returned.
     */
    getById: (state) => {
      return (id: string) => {

        const index = state.customers.findIndex(x => x.id === id)

        if (index === -1)
          return null

        return state.customers[index]
      }
    }
  },
  persist: true
})