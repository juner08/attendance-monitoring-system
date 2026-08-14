<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  records: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['delete-record', 'edit-record'])

const search = ref('')

const filteredRecords = computed(() => {
  return props.records.filter(record =>
    record.studentName
      .toLowerCase()
      .includes(search.value.toLowerCase())
  )
})
</script>

<template>
  <section class="bg-white p-6 rounded-lg shadow">

    <h2 class="text-2xl font-bold mb-4">
      Attendance Records
    </h2>

    <div class="mb-6">
      <label class="block font-semibold mb-2">
        Search Student
      </label>

      <input
        v-model="search"
        type="text"
        placeholder="Search by student name..."
        class="w-full border border-gray-300 rounded-lg p-3"
      />
    </div>

    <div
      v-if="filteredRecords.length === 0"
      class="text-gray-600"
    >
      No attendance records found.
    </div>

    <div v-else class="overflow-x-auto">

      <table class="w-full border-collapse">

        <thead>
          <tr class="bg-gray-100">

            <th class="border p-3 text-left">
              Student Name
            </th>

            <th class="border p-3 text-left">
              Date
            </th>

            <th class="border p-3 text-left">
              Status
            </th>

            <th class="border p-3 text-left">
              Action
            </th>

          </tr>
        </thead>

        <tbody>

          <tr
            v-for="record in filteredRecords"
            :key="record.id"
          >

            <td class="border p-3">
              {{ record.studentName }}
            </td>

            <td class="border p-3">
              {{ record.date }}
            </td>

            <td class="border p-3">
              {{ record.status }}
            </td>

            <td class="border p-3 space-x-2">

              <button
                @click="emit('edit-record', record)"
                class="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600"
              >
                Edit
              </button>

              <button
                @click="emit('delete-record', record.id)"
                class="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>

            </td>

          </tr>

        </tbody>

      </table>

    </div>

  </section>
</template>