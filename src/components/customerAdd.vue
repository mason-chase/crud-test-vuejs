<template>
  <div class="flex justify-end mb-4">
    <div class="rounded border py-1 px-2 border-gray-500 flex items-center gap-2 transition hover:text-white hover:bg-gray-500 cursor-pointer" @click="openModal">
      <svg-icon icon="fa-solid fa-user-plus" />
      <span>Add new customer</span>
    </div>
  </div>
  <modalBox title="Add new custoemr" :status="modalStatus" @close="modalStatus = $event">
    <Form  @submit="save" :validation-schema="schema" @invalid-submit="invalid" class="flex flex-col gap-2">
      <div class="flex gap-2 items-center">
        <label for="Firstname" class="w-24">First name</label>
        <Field type="text" id="Firstname" name="Firstname" class="border border-gray-400 bg-gray-200 py-1 px-2 grow rounded" v-model="data.Firstname" />
      </div>
      <div class="flex gap-2 items-center">
        <label for="Lastname" class="w-24">Last name</label>
        <Field type="text" id="Lastname" name="Lastname" class="border border-gray-400 bg-gray-200 py-1 px-2 grow rounded" v-model="data.Lastname" />
      </div>
      <div class="flex gap-2 items-center">
        <label for="DateOfBirth" class="w-24">DOB</label>
        <Field type="text" id="DateOfBirth" name="DateOfBirth" class="border border-gray-400 bg-gray-200 py-1 px-2 grow rounded" v-model="data.DateOfBirth" />
      </div>
      <div class="flex gap-2 items-center">
        <label for="PhoneNumber" class="w-24">Phone number</label>
        <Field type="text" id="PhoneNumber" name="PhoneNumber" class="border border-gray-400 bg-gray-200 py-1 px-2 grow rounded" v-model="data.PhoneNumber" placeholder="1 800 1234567" />
      </div>
      <div class="flex gap-2 items-center">
        <label for="Email" class="w-24">Email</label>
        <Field type="text" id="Email" name="Email" class="border border-gray-400 bg-gray-200 py-1 px-2 grow rounded" v-model="data.Email" />
      </div>
      <div class="flex gap-2 items-center">
        <label for="BankAccountNumber" class="w-24">Bank account</label>
        <Field type="text" id="BankAccountNumber" name="BankAccountNumber" class="border border-gray-400 bg-gray-200 py-1 px-2 grow rounded" v-model="data.BankAccountNumber" />
      </div>
      <div class="flex gap-2 items-center">
        <div class="grow text-red-500">{{error}}</div>
        <input class="border border-gray-400 bg-gray-200 py-1 px-8 rounded cursor-pointer"  type="submit" value="Save" />
      </div>
    </Form>
  </modalBox>
</template>

<script>
import { ref } from 'vue'
import modalBox from './modalBox.vue'
import { Form, Field } from 'vee-validate'
import { useCustomers } from '@/composables/customers'
export default {
  name: 'custoemrAdd',
  components: { modalBox, Form, Field },
  setup (props, context) {
    const customer = useCustomers()
    const modalStatus = ref(false)
    const openModal = function () { modalStatus.value = true }
    const data = ref({ Firstname: '', Lastname: '', DateOfBirth: '', PhoneNumber: '', Email: '', BankAccountNumber : '' })
    const error = ref('')
    const schema = customer.validationSchema
    const invalid = function({ errors }) { const f = Object.keys(errors)[0]; error.value = errors[f] }
    const save = function() {
      error.value = ''
      const newCustomerValidaiton = customer.isNewCustomerValid(data.value)
      if (newCustomerValidaiton !== true) { error.value = newCustomerValidaiton; return false }
      modalStatus.value = false
      context.emit('save', data.value)
      data.value = { Firstname: '', Lastname: '', DateOfBirth: '', PhoneNumber: '', Email: '', BankAccountNumber : '' }
    }
    return { modalStatus, openModal, data, schema, save, invalid, error }
  }
}
</script>
