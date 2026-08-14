<script setup>
import { computed } from 'vue'

const props = defineProps({
  records: {
    type: Array,
    default: () => []
  }
})

const totalRecords = computed(() => {
  return props.records.length
})

const presentCount = computed(() => {
  return props.records.filter(
    record => record.status === 'Present'
  ).length
})

const lateCount = computed(() => {
  return props.records.filter(
    record => record.status === 'Late'
  ).length
})

const absentCount = computed(() => {
  return props.records.filter(
    record => record.status === 'Absent'
  ).length
})
</script>

<template>
  <section class="mb-6">

    <h2 class="text-2xl font-bold mb-4">
      Attendance Summary
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">

      <!-- Total -->
      <div class="bg-white p-5 rounded-lg shadow">
        <p class="text-gray-600">
          Total Records
        </p>

        <p class="text-3xl font-bold">
          {{ totalRecords }}
        </p>
      </div>

      <!-- Present -->
      <div class="bg-white p-5 rounded-lg shadow">
        <p class="text-gray-600">
          Present
        </p>

        <p class="text-3xl font-bold">
          {{ presentCount }}
        </p>
      </div>

      <!-- Late -->
      <div class="bg-white p-5 rounded-lg shadow">
        <p class="text-gray-600">
          Late
        </p>

        <p class="text-3xl font-bold">
          {{ lateCount }}
        </p>
      </div>

      <!-- Absent -->
      <div class="bg-white p-5 rounded-lg shadow">
        <p class="text-gray-600">
          Absent
        </p>

        <p class="text-3xl font-bold">
          {{ absentCount }}
        </p>
      </div>

    </div>

  </section>
</template>