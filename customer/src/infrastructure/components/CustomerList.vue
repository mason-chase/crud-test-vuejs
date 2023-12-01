<template>
  <div class="card title">Customer's List</div>
  <div id="customerList" class="card">
    <div class="customer-list-header">
      <button class="button">Add</button>
    </div>
    <div class="customer-list-body">
      <div v-for="customer in customers" :key="customer.id" class="customer-card">
        <div class="customer-card-header">
          <div class="customer-info">
            <div class="main-info text-primary">
              <div id="fullName">{{ customer.firstName }} {{ customer.firstName }}</div>
            </div>
            <div class="second-info text-secondary">
              <div id="email">Email: {{ customer.email }}</div>
              <div id="phoneNumber">Phone Number: {{ customer.phoneNumber }}</div>
              <div id="bankAccountNumber">Bank Account Number: {{ customer.bankAccountNumber }}</div>
            </div>
          </div>
          <div class="customer-buttons">
            <i class="fa-solid fa-trash small-button delete" @click="deleteCustomer(customer.id)"></i>
          </div>
        </div>
        <div class="customer-card-bottom text-secondary">
          <div id="dateOfBirth">Date Of Birth: {{ new Date(customer.dateOfBirth).toLocaleDateString() }}</div>
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

  export default defineComponent({
    name: 'customer-list',
    computed: {
      ...mapStores(useCustomerStore)
    },
    data() {
      return {
        customers: [] as Customer[]
      }
    },
    created() {
      this.customers = this.customerStore.all
    },
    methods: {
      /**
       * Deletes customer by given id.
       */
      deleteCustomer(id: string): void {
        this.customerStore.delete(id)
      }
    }
  })
</script>

<style>
  @import "~/infrastructure/styles/customer-list";
</style>