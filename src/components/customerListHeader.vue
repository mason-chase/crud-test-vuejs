<template>
  <div class="flex divide-x divide-gray-400 border border-gray-400 rounded-t">
    <div class="py-1 px-2 w-48">Firstname</div>
    <div class="py-1 px-2 w-48">Lastname</div>
    <div class="py-1 px-2 w-40">DateOfBirth</div>
    <div class="py-1 px-2 w-40">PhoneNumber</div>
    <div class="py-1 px-2 w-48">Email</div>
    <div class="py-1 px-2">BankAccountNumber</div>
    <div class="py-1 px-2 ml-auto w-20">Actions</div>
  </div>
</template>

<script>
export default {
  name: 'custoemrListHeader',
  props: {}
}
</script>
