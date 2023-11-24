<template>
  <div class="flex divide-x divide-gray-400 border border-t-0 border-gray-400 transition hover:bg-gray-200">
    <div class="py-1 px-2 w-48">{{ data.Firstname }}</div>
    <div class="py-1 px-2 w-48">{{ data.Lastname }}</div>
    <div class="py-1 px-2 w-40">{{ data.DateOfBirth }}</div>
    <div class="py-1 px-2 w-40">{{ data.PhoneNumber }}</div>
    <div class="py-1 px-2 w-48">{{ data.Email }}</div>
    <div class="py-1 px-2">{{ data.BankAccountNumber }}</div>
    <div class="py-1 px-2 ml-auto w-20 flex gap-4 items-center justify-center">
      <div class="cursor-pointer" @click="editFn"><svg-icon icon="fa-solid fa-user-pen" /></div>
      <div class="cursor-pointer" @click="removeFn"><svg-icon icon="fa-solid fa-user-minus" /></div>
    </div>
  </div>
  <customerEdit ref="editRef" :customer="data" />
  <customerListRemove ref="removeRef" />
</template>

<script>
import { ref } from 'vue'
import customerListRemove from './customerListRemove.vue';
import customerEdit from './customerEdit.vue';
export default {
  name: 'custoemrListItem',
  props: { data: Object },
  components: { customerListRemove, customerEdit },
  setup (propbs, context) {
    const editRef = ref(null)
    const removeRef = ref(null)
    const removeFn = function() { removeRef.value.show().then((result) => { if (result === true) { context.emit('remove') } })}
    const editFn = function() { editRef.value.show().then((result) => { if (result !== false) { context.emit('update', result) } }) }
    return { editRef, removeRef, editFn, removeFn }
  }
}
</script>
