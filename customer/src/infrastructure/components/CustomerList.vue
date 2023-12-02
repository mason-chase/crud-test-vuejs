<template>
  <div class="card title">Customer's List</div>
  <div id="customerList">
    <div v-if="formErrors" class="formErrors">{{ formErrors }}</div>
    <div class="card">
      <div class="customer-list-header">
        <button @click="addCustomer" class="button">Add</button>
        <button @click="deleteAll" class="button">Delete All</button>
      </div>
      <div class="customer-list-body">
        <div v-for="(customer, index) in customers" :key="index" class="customer-card">
          <div class="customer-card-header">
            <div class="customer-info">
              <div class="text-primary">
                <span class="main-info " v-if="customer.readonly">{{ customer.firstName }} {{ customer.lastName }}</span>
                <div v-else>
                  <div class="d-flex">
                    <div class="label">FirstName:</div>
                    <div class="value">
                      <input type="text" v-model="customer.firstName" id="firstName" placeholder="FirstName">
                    </div>
                  </div>
                  <div class="d-flex">
                    <div class="label">LastName:</div>
                    <div class="value">
                      <input type="text" v-model="customer.lastName" id="lastName" placeholder="LastName">
                    </div>
                  </div>
                </div>
              </div>
              <div class="second-info text-secondary">
                <div class="d-flex">
                  <div class="label">Email:</div>
                  <div class="value">
                    <span v-if="customer.readonly">{{ customer.email }}</span>
                    <input v-else type="email" v-model="customer.email" id="email" placeholder="Email">
                  </div>
                </div>
                <div class="d-flex">
                  <div class="label">Phone Number:</div>
                  <div class="value">
                    <span v-if="customer.readonly">{{ customer.phoneNumber }}</span>
                    <input v-else type="text" v-model="customer.phoneNumber" id="phoneNumber" placeholder="Phone Number">
                  </div>
                </div>
                <div class="d-flex">
                  <div class="label">Bank Account Number:</div>
                  <div class="value">
                    <span v-if="customer.readonly">{{ customer.bankAccountNumber }}</span>
                    <input v-else type="text" v-model="customer.bankAccountNumber" id="bankAccountNumber" placeholder="Bank Account Number">
                  </div>
                </div>
              </div>
            </div>
            <div class="customer-buttons">
              <i class="fa-solid fa-trash small-button delete" @click="deleteCustomer(customer, index)"></i>
              <i v-if="customer.readonly" class="fa-solid fa-edit small-button" @click="editCustomer(customer)"></i>
              <i v-else class="fa-solid fa-check small-button" @click="saveCustomer(customer, index)"></i>
            </div>
          </div>
          <div class="customer-card-bottom text-secondary">
            <div class="d-flex">
              <div class="label">Date Of Birth:</div>
              <div class="value">
                <span v-if="customer.readonly">{{ new Date(customer.dateOfBirth).toLocaleDateString() }}</span>
                <input v-else type="date" v-model="customer.dateOfBirth" min="1900-01-01" max="2099-12-31" id="dateOfBirth" placeholder="Date Of Birth">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang=ts>
  import { defineComponent } from 'vue'
  import { mapStores } from 'pinia'
  import { useCustomerStore } from '~/infrastructure/store/customer'
  import { Customer } from '~/domain/customer'
  import { cloneDeep } from '~/infrastructure/plugins/general'

  export default defineComponent({
    name: 'customer-list',
    computed: {
      ...mapStores(useCustomerStore)
    },
    data() {
      return {
        customers: [] as Customer[],
        formErrors: ''
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      /**
       * Fetches Data from store.
       */
      fetchData() {
        this.customers = cloneDeep<Customer>(this.customerStore.all)
        this.customers.forEach((customer: Customer) => {
          customer.readonly = true
        })
      },
      /**
       * Deletes customer by given id.
       */
      deleteCustomer(customer: Customer, index: number): void {

        if (customer.id)
          this.customerStore.delete(customer.id)

        // this will delete not saved customers
        // and also removes deleted customer in db from data
        this.customers.splice(index, 1)

        this.clearFormErrors()
      },
      /**
       * Add new Customer.
       */
      addCustomer() {
        this.customers.push(new Customer())
        this.clearFormErrors()
      },
      /**
       * Save Customer if customer is valid.
       */
      saveCustomer(customer: Customer, index: number) {
        const validated = this.customerStore.validate(customer)

        if (validated.result) {
          customer.readonly = true

          if (customer.id)
            this.customerStore.update(customer)
          else
            this.customerStore.create(customer)

          this.clearFormErrors()
        }
        else
          this.generateHumanReadableErrors(validated.errors, index)
      },
      /**
       * Changes Customer mode.
       */
      editCustomer(customer: Customer) {
        customer.readonly = false
        this.clearFormErrors()
      },
      /**
       * Deletes all customers.
       */
      deleteAll() {
        this.customerStore.clear()
        this.fetchData()
        this.clearFormErrors()
      },
      /**
       * Generates human readable form errors.
       */
      clearFormErrors() {
        this.formErrors = ''
      },
      /**
       * Generates human readable form errors.
       */
      generateHumanReadableErrors(errors: string[], index: number) {
        var base = `Row Number ${index + 1}: \n`

        for (var msg of errors) {
          base += ' - ' + msg + '\n'
        }
        this.formErrors = base
      },
    }
  })
</script>

<style>
  @import "~/infrastructure/styles/customer-list";
</style>