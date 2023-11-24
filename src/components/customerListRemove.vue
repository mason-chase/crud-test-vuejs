<template>
  <modalBox title="Add new custoemr" :status="modalStatus" @close="closeRemoveModal" :isClosable="false">
    <div class="flex flex-col gap-4">
      <div>Are you sure you want to delete this record ?</div>
      <div class="flex gap-2">
        <div class="basis-1/2 rounded bg-gray-200 py-1 text-center cursor-pointer transition hover:bg-gray-300" @click="closeRemoveModal">NO</div>
        <div class="basis-1/2 rounded bg-red-600 text-white py-1 text-center cursor-pointer transition hover:bg-red-700" @click="confirm">YES</div>
      </div>
    </div>
  </modalBox>
</template>

<script>
import { ref } from 'vue'
import modalBox from './modalBox.vue'
export default {
  name: 'custoemrListRemove',
  components: { modalBox },
  setup () {
    const modalStatus = ref(false)
    let resolvePromise

    const closeRemoveModal = function() {
      modalStatus.value = false
      resolvePromise(false)
    }
    const confirm = function() {
      modalStatus.value = false
      resolvePromise(true)
    }
    const show = function() {
      modalStatus.value = true
      return new Promise((resolve) => { resolvePromise = resolve })
    }

    return { modalStatus, closeRemoveModal, confirm, show }
  }
}
</script>
