import { defineStore } from 'pinia'
import { Customer } from '~/domain/customer'

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
    validate(customer: Customer): boolean {

      const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

      // firstName must be unique
      if (this.customers.some((x: Customer) => x.firstName === customer.firstName))
        return false

      // lastName must be unique
      if (this.customers.some((x: Customer) => x.lastName === customer.lastName))
        return false

      // email must be unique
      if (this.customers.some((x: Customer) => x.email === customer.email))
        return false

      // dateOfBirth must be unique
      if (this.customers.some((x: Customer) => x.dateOfBirth === customer.dateOfBirth))
        return false

      if (!emailRegex.test(customer.email))
        return false

      return true
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