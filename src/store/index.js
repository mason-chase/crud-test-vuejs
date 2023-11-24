import { defineStore } from "pinia"

export const mainStore = defineStore("main", {
  state: () => {
    return {
      list: []
    }
  },
  actions: {
    addRecord(newCustomer) {
      this.list.push(newCustomer)
      return true
    },
    removeRecord(email) {
      const i = this.list.findIndex(i => i.Email === email)
      if ( i < 0 ) { return false }
      this.list.splice(i, 1)
      return true
    },
    editRecord(email, editedCustomer) {
      const i = this.list.findIndex(i => i.Email === email)
      if ( i < 0 ) { return false }
      this.list[i] = editedCustomer
      return true
    },
    clearAll() {
      this.list = []
      return true
    }
  },
  getters: {
    getRecord: (state, email) => {
      return state.list.filter(i => i.Email === email)
    },
    getAll: (state) => {
      return state.list
    },
  },
  persist: true
})