<template>
  <div id="customerApp">
    <CustomerList />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import CustomerList from '~/infrastructure/components/CustomerList.vue'

  export default defineComponent({
    name: 'customer-app',
    components: {
      CustomerList
    }
  })
</script>

<style>
  * {
    box-sizing: border-box;
  }
</style>
