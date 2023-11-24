<template>
  <div>
    <div class='fixed top-0 left-0 w-full h-full bg-gray-600/30 backdrop-blur-sm flex flex-col items-center justify-center z-50 overflow-y-hidden p-4' v-if='isOpen' @click.self.stop='close(`body`)'>
      <div class='bg-white shadow-lg p-4 rounded-lg w-96 overflow-y-auto'>
        <div class='border-b border-gray-600 pb-2 mb-4 flex'>
          <h1 class='flex-grow font-bold'> {{title}}</h1>
          <div class='flex-grow-0 flex-shrink-0 text-gray-500 hover:text-gray-700 cursor-pointer text-center' @click.stop='close(`icon`)'>
            <svg-icon icon="fa-solid fa-xmark-circle" />
          </div>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: { },
  model: { prop: 'status', event: 'input' },
  props: {
    title: { type: String, default: '' },
    status: Boolean
  },
  data () {
    return {
      isOpen: false
    }
  },
  created () {
    this.isOpen = this.status
  },
  methods: {
    close () {
      this.isOpen = false
      this.$emit('close', false)
    }
  },
  watch: {
    status (newValue) {
      this.isOpen = newValue
    }
  }
}
</script>
