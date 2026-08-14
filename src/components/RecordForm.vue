<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  editingRecord: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['add-record', 'update-record'])

const studentName = ref('')
const date = ref('')
const status = ref('Present')

const errorMessage = ref('')

watch(
  () => props.editingRecord,
  (record) => {
    if (record) {
      studentName.value = record.studentName
      date.value = record.date
      status.value = record.status
      errorMessage.value = ''
    }
  }
)

const submitAttendance = () => {
  errorMessage.value = ''

  if (!studentName.value.trim()) {
    errorMessage.value = 'Please enter the student name.'
    return
  }

  if (!date.value) {
    errorMessage.value = 'Please select the attendance date.'
    return
  }

  if (!['Present', 'Late', 'Absent'].includes(status.value)) {
    errorMessage.value = 'Please select a valid attendance status.'
    return
  }

  const attendance = {
    studentName: studentName.value.trim(),
    date: date.value,
    status: status.value
  }

  if (props.editingRecord) {
    emit('update-record', {
      ...attendance,
      id: props.editingRecord.id
    })
  } else {
    emit('add-record', {
      ...attendance,
      id: Date.now()
    })
  }

  clearForm()
}

const clearForm = () => {
  studentName.value = ''
  date.value = ''
  status.value = 'Present'
  errorMessage.value = ''
}
</script>

<template>
  <section class="bg-white p-6 rounded-lg shadow">

    <h2 class="text-2xl font-bold mb-4">
      {{ editingRecord ? 'Edit Attendance' : 'Record Attendance' }}
    </h2>

    <!-- Validation Message -->
    <div
      v-if="errorMessage"
      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4"
    >
      {{ errorMessage }}
    </div>

    <form
      @submit.prevent="submitAttendance"
      class="space-y-4"
    >

      <!-- Student Name -->
      <div>
        <label class="block font-semibold mb-2">
          Student Name
        </label>

        <input
          v-model="studentName"
          type="text"
          placeholder="Enter student name"
          class="w-full border border-gray-300 rounded-lg p-3"
        />
      </div>

      <!-- Date -->
      <div>
        <label class="block font-semibold mb-2">
          Date
        </label>

        <input
          v-model="date"
          type="date"
          class="w-full border border-gray-300 rounded-lg p-3"
        />
      </div>

      <!-- Status -->
      <div>
        <label class="block font-semibold mb-2">
          Attendance Status
        </label>

        <select
          v-model="status"
          class="w-full border border-gray-300 rounded-lg p-3"
        >
          <option value="Present">Present</option>
          <option value="Late">Late</option>
          <option value="Absent">Absent</option>
        </select>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
      >
        {{ editingRecord ? 'Update Attendance' : 'Add Attendance' }}
      </button>

    </form>

  </section>
</template>