<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'success'
  }
})
</script>

<template>

  <Transition name="toast">

    <div
      v-if="show"
      class="fixed top-6 right-6 z-[60] w-full max-w-sm"
    >

      <div
        :class="[
          'flex items-start gap-3 p-4 rounded-2xl shadow-xl border',
          type === 'success'
            ? 'bg-white border-green-200'
            : 'bg-white border-red-200'
        ]"
      >

        <!-- Icon -->
        <div
          :class="[
            'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
            type === 'success'
              ? 'bg-green-100 text-green-600'
              : 'bg-red-100 text-red-600'
          ]"
        >
          {{ type === 'success' ? '✓' : '!' }}
        </div>

        <!-- Message -->
        <div class="flex-1">

          <p class="font-semibold text-slate-900">
            {{ type === 'success' ? 'Success' : 'Error' }}
          </p>

          <p class="text-sm text-slate-500 mt-1">
            {{ message }}
          </p>

        </div>

      </div>

    </div>

  </Transition>

</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>