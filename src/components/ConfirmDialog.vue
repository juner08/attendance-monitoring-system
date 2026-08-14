<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'Confirm Action'
  },
  message: {
    type: String,
    default: 'Are you sure you want to continue?'
  }
})

const emit = defineEmits([
  'confirm',
  'cancel'
])
</script>

<template>
  <Teleport to="body">

    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >

      <!-- Background -->
      <div
        class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        @click="emit('cancel')"
      ></div>

      <!-- Dialog -->
      <div
        class="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
      >

        <!-- Icon -->
        <div class="flex justify-center pt-7">

          <div
            class="w-14 h-14 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-2xl"
          >
            ⚠️
          </div>

        </div>

        <!-- Content -->
        <div class="px-6 py-5 text-center">

          <h2 class="text-xl font-bold text-slate-900">
            {{ title }}
          </h2>

          <p class="text-slate-500 mt-2 leading-relaxed">
            {{ message }}
          </p>

        </div>

        <!-- Buttons -->
        <div
          class="flex gap-3 px-6 pb-6"
        >

          <button
            @click="emit('cancel')"
            class="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition"
          >
            Cancel
          </button>

          <button
            @click="emit('confirm')"
            class="flex-1 px-4 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
          >
            Delete
          </button>

        </div>

      </div>

    </div>

  </Teleport>
</template>