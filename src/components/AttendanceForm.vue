<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  editingRecord: {
    type: Object,
    default: null
  },

  students: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits([
  'save',
  'cancel'
])


// ======================================
// FORM DATA
// ======================================

const studentId = ref('')
const date = ref('')
const status = ref('Present')
const remarks = ref('')


// ======================================
// TODAY
// ======================================

const today = computed(() => {

  const now = new Date()

  const year = now.getFullYear()

  const month = String(
    now.getMonth() + 1
  ).padStart(2, '0')

  const day = String(
    now.getDate()
  ).padStart(2, '0')

  return `${year}-${month}-${day}`
})


// ======================================
// EDIT MODE
// ======================================

const isEditing = computed(() => {
  return !!props.editingRecord
})


// ======================================
// LOAD EDIT DATA
// ======================================

const loadRecord = () => {

  if (props.editingRecord) {

    studentId.value =
      props.editingRecord.studentId || ''

    date.value =
      props.editingRecord.date || today.value

    status.value =
      props.editingRecord.status || 'Present'

    remarks.value =
      props.editingRecord.remarks || ''

  } else {

    studentId.value = ''

    date.value = today.value

    status.value = 'Present'

    remarks.value = ''

  }

}


watch(
  () => props.editingRecord,
  loadRecord,
  {
    immediate: true
  }
)


// ======================================
// SUBMIT
// ======================================

const submitForm = () => {

  if (!studentId.value) {

    alert('Please select a student.')

    return
  }


  if (!date.value) {

    alert('Please select a date.')

    return
  }


  emit('save', {

    ...(props.editingRecord || {}),

    studentId: studentId.value,

    date: date.value,

    status: status.value,

    remarks: remarks.value.trim()

  })

}


// ======================================
// CANCEL
// ======================================

const cancelForm = () => {

  emit('cancel')

}
</script>


<template>

  <div class="space-y-6">


    <!-- ================================= -->
    <!-- HEADER -->
    <!-- ================================= -->

    <div>

      <h2
        class="text-2xl font-bold text-slate-900"
      >

        {{
          isEditing
            ? 'Edit Attendance'
            : 'Record Attendance'
        }}

      </h2>

      <p class="text-slate-500 mt-1">

        {{
          isEditing
            ? 'Update the attendance record.'
            : 'Add a new student attendance record.'
        }}

      </p>

    </div>


    <!-- ================================= -->
    <!-- FORM -->
    <!-- ================================= -->

    <form
      @submit.prevent="submitForm"
      class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6"
    >


      <!-- STUDENT -->

      <div>

        <label
          class="block text-sm font-semibold text-slate-700 mb-2"
        >
          Student
        </label>

        <select
          v-model="studentId"
          class="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
        >

          <option
            value=""
            disabled
          >
            Select a student
          </option>

          <option
            v-for="student in students"
            :key="student.id"
            :value="student.id"
          >
            {{ student.name }} — {{ student.id }}
          </option>

        </select>

      </div>


      <!-- DATE -->

      <div>

        <label
          class="block text-sm font-semibold text-slate-700 mb-2"
        >
          Attendance Date
        </label>

        <input
          v-model="date"
          type="date"
          :max="today"
          class="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>


      <!-- STATUS -->

      <div>

        <label
          class="block text-sm font-semibold text-slate-700 mb-3"
        >
          Attendance Status
        </label>


        <div
          class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3"
        >


          <!-- PRESENT -->

          <label
            class="cursor-pointer"
          >

            <input
              v-model="status"
              type="radio"
              value="Present"
              class="sr-only"
            />

            <div
              :class="
                status === 'Present'
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-slate-200 bg-white text-slate-600'
              "
              class="border-2 rounded-xl p-4 text-center transition"
            >

              <div class="text-2xl mb-1">
                ✓
              </div>

              <p class="font-semibold">
                Present
              </p>

            </div>

          </label>

          <!-- EXCUSED -->
          <label class="cursor-pointer">
            <input v-model="status" type="radio" value="Excused" class="sr-only" />
            <div
              :class="status === 'Excused' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-600'"
              class="border-2 rounded-xl p-4 text-center transition"
            >
              <div class="text-2xl mb-1">ℹ</div>
              <p class="font-semibold">Excused</p>
            </div>
          </label>


          <!-- LATE -->

          <label
            class="cursor-pointer"
          >

            <input
              v-model="status"
              type="radio"
              value="Late"
              class="sr-only"
            />

            <div
              :class="
                status === 'Late'
                  ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                  : 'border-slate-200 bg-white text-slate-600'
              "
              class="border-2 rounded-xl p-4 text-center transition"
            >

              <div class="text-2xl mb-1">
                ⏰
              </div>

              <p class="font-semibold">
                Late
              </p>

            </div>

          </label>


          <!-- ABSENT -->

          <label
            class="cursor-pointer"
          >

            <input
              v-model="status"
              type="radio"
              value="Absent"
              class="sr-only"
            />

            <div
              :class="
                status === 'Absent'
                  ? 'border-red-500 bg-red-50 text-red-700'
                  : 'border-slate-200 bg-white text-slate-600'
              "
              class="border-2 rounded-xl p-4 text-center transition"
            >

              <div class="text-2xl mb-1">
                ✕
              </div>

              <p class="font-semibold">
                Absent
              </p>

            </div>

          </label>

        </div>

      </div>


      <!-- REMARKS -->

      <div>

        <label
          class="block text-sm font-semibold text-slate-700 mb-2"
        >
          Remarks
        </label>

        <textarea
          v-model="remarks"
          rows="4"
          placeholder="Optional remarks..."
          class="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500"
        ></textarea>

      </div>


      <!-- BUTTONS -->

      <div
        class="flex flex-col sm:flex-row justify-end gap-3 pt-4 border-t border-slate-200"
      >

        <button
          type="button"
          @click="cancelForm"
          class="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition"
        >
          Cancel
        </button>


        <button
          type="submit"
          class="px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >

          {{
            isEditing
              ? 'Update Attendance'
              : 'Save Attendance'
          }}

        </button>

      </div>

    </form>

  </div>

</template>
