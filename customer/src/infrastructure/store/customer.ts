import { defineStore } from 'pinia'
import { Customer } from '~/domain/customer'

export const useCustomerStore = defineStore('customer', {

  state: () => ({
    customers: [] as Customer[],
  }),

  actions: {
    clear() {
      this.$reset()
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
  }
})