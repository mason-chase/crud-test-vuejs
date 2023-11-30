import { defineStore } from 'pinia'
import { Customer } from '~/domain/customer'

export const useCustomerStore = defineStore('customer', {

  state: () => ({
    customers: [] as Customer[],
  }),

  actions: {
    clear() {
      this.$reset()
    },
    create(customer: Customer) {
      this.customers.push(customer)
    },
    delete(id: string) {
      const index = this.customers.findIndex((x: Customer) => x.id === id)
      this.customers.splice(index, 1)
    },
    update(customer: Customer): Customer {
      const index = this.customers.findIndex((x: Customer) => x.id === customer.id)
      this.customers[index] = customer
      return this.customers[index]
    }
  },
  getters: {
    all(state) {
      return state.customers
    },
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