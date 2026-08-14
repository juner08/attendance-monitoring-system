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
  },

  tone: {
    type: String,
    default: 'blue'
  }
})
</script>

<template>
  <div
    class="stat-card bg-white rounded-3xl border border-slate-200 p-5 shadow-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
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
        :class="`stat-card__icon stat-card__icon--${tone}`"
        class="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
      >
        {{ icon }}
      </div>

    </div>

  </div>
</template>
