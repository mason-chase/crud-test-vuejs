<template>
  <main class="w-screen h-screen flex items-center justify-center text-sm">
    <div class="container rounded border bg-gray-100 p-4">

      <customerAddVue @save="add" />
      <customerListHeader />
      <customerListEmpty v-if="customersList.length === 0" />
      <customerListItem
        v-for="row in customersList"
        :key="row.Email"
        :data="row"
        @remove="remove(row.Email)"
        @update="update(row.Email, $event)"
      />

    </div>
  </main>
</template>

<script setup>
import { useCustomers } from '@/composables/customers'
import customerAddVue from "./components/customerAdd.vue"
import customerListHeader from "./components/customerListHeader.vue"
import customerListItem from './components/customerListItem.vue'
import customerListEmpty from './components/customerListEmpty.vue'
const customers = useCustomers()
const customersList = customers.customersList()
const add = function(e) { customers.add(e) }
const remove = function(e) { customers.remove(e) }
const update = function(e, data) { customers.update(e, data) }
</script>