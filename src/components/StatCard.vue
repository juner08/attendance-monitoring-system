<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },

  value: {
    type: [Number, String],
    required: true
  },

  icon: {
    type: String,
    required: true
  },

  description: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div
    class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition"
  >

    <div class="flex items-start justify-between">

      <!-- Information -->
      <div>

        <p class="text-sm font-medium text-slate-500">
          {{ title }}
        </p>

        <p class="text-3xl font-bold text-slate-900 mt-2">
          {{ value }}
        </p>

        <p
          v-if="description"
          class="text-xs text-slate-500 mt-2"
        >
          {{ description }}
        </p>

      </div>

      <!-- Icon -->
      <div
        class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-2xl"
      >
        {{ icon }}
      </div>

    </div>

  </div>
</template>