<script setup>
import { ref, computed } from 'vue'

import AttendanceForm from './AttendanceForm.vue'
import ConfirmDialog from './ConfirmDialog.vue'
import Toast from './Toast.vue'

import { useAttendance } from '../composables/useAttendance'
import { useStudents } from '../composables/useStudents'


const {
  totalAttendance,
  totalPresent,
  totalAbsent,
  totalLate,
  totalExcused,
  attendanceRate,
  searchAttendance,
  addAttendance,
  updateAttendance,
  deleteAttendance
} = useAttendance()


const {
  students
} = useStudents()


// ======================================
// STATE
// ======================================

const search = ref('')

const statusFilter = ref('All')

const showForm = ref(false)

const editingRecord = ref(null)

const showDeleteDialog = ref(false)

const recordToDelete = ref(null)

const showToast = ref(false)

const message = ref('')

const messageType = ref('success')


// ======================================
// FILTER ATTENDANCE
// ======================================

const filteredAttendance = computed(() => {

  const records = searchAttendance('', statusFilter.value)

  const keyword = search.value.toLowerCase().trim()

  if (!keyword) {
    return records
  }

  return records.filter(record => [
    record.studentId,
    record.date,
    record.status,
    record.remarks || '',
    getStudentName(record.studentId),
    getStudentCourse(record.studentId)
  ].some(value => String(value).toLowerCase().includes(keyword)))

})


// ======================================
// GET STUDENT NAME
// ======================================

const getStudentName = (studentId) => {

  const student = students.value.find(
    student => student.id === studentId
  )

  return student
    ? student.name
    : 'Unknown Student'
}


// ======================================
// GET STUDENT COURSE
// ======================================

const getStudentCourse = (studentId) => {

  const student = students.value.find(
    student => student.id === studentId
  )

  return student
    ? student.course
    : '—'
}


// ======================================
// OPEN ADD FORM
// ======================================

const openAddForm = () => {

  editingRecord.value = null

  showForm.value = true
}


// ======================================
// OPEN EDIT FORM
// ======================================

const openEditForm = (record) => {

  editingRecord.value = {
    ...record
  }

  showForm.value = true
}


// ======================================
// CLOSE FORM
// ======================================

const closeForm = () => {

  showForm.value = false

  editingRecord.value = null
}


// ======================================
// SAVE ATTENDANCE
// ======================================

const saveAttendance = (record) => {

  let result

  if (editingRecord.value) {

    result = updateAttendance(record)

  } else {

    result = addAttendance(record)

  }


  message.value = result.message

  messageType.value =
    result.success
      ? 'success'
      : 'error'

  showToast.value = true


  if (result.success) {

    closeForm()

  }


  setTimeout(() => {

    showToast.value = false

    message.value = ''

  }, 3000)
}


// ======================================
// DELETE
// ======================================

const removeAttendance = (record) => {

  recordToDelete.value = record

  showDeleteDialog.value = true
}


// ======================================
// CANCEL DELETE
// ======================================

const cancelDelete = () => {

  showDeleteDialog.value = false

  recordToDelete.value = null
}


// ======================================
// CONFIRM DELETE
// ======================================

const confirmDelete = () => {

  if (!recordToDelete.value) {
    return
  }


  const result = deleteAttendance(
    recordToDelete.value.id
  )


  showDeleteDialog.value = false

  recordToDelete.value = null


  message.value = result.message

  messageType.value =
    result.success
      ? 'success'
      : 'error'

  showToast.value = true


  setTimeout(() => {

    showToast.value = false

    message.value = ''

  }, 3000)
}


// ======================================
// FORMAT DATE
// ======================================

const formatDate = (date) => {

  if (!date) {
    return '—'
  }


  const formatted =
    new Date(`${date}T00:00:00`)


  return formatted.toLocaleDateString(
    'en-US',
    {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }
  )
}
</script>


<template>

  <div class="space-y-6">


    <!-- ================================= -->
    <!-- PAGE HEADER -->
    <!-- ================================= -->

    <div class="page-heading flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

      <div>

        <h1
          class="text-2xl font-bold text-slate-900"
        >
          Attendance
        </h1>

        <p class="text-slate-500 mt-1">
          Record and monitor student attendance.
        </p>

      </div>


      <button
        @click="openAddForm"
        class="primary-action bg-blue-600 text-white px-5 py-3 rounded-2xl font-semibold hover:bg-blue-700 transition shadow-sm"
      >
        + Record Attendance
      </button>

    </div>


    <!-- ================================= -->
    <!-- STATISTICS -->
    <!-- ================================= -->

    <div
      v-if="!showForm"
      class="grid grid-cols-2 lg:grid-cols-5 gap-4"
    >


      <!-- TOTAL -->

      <div
        class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"
      >

        <p class="text-sm text-slate-500">
          Total Records
        </p>

        <p
          class="text-2xl font-bold text-slate-900 mt-2"
        >
          {{ totalAttendance }}
        </p>

      </div>


      <!-- PRESENT -->

      <div
        class="bg-white rounded-2xl border border-green-200 p-5 shadow-sm"
      >

        <p class="text-sm text-green-600">
          Present
        </p>

        <p
          class="text-2xl font-bold text-green-700 mt-2"
        >
          {{ totalPresent }}
        </p>

      </div>


      <!-- ABSENT -->

      <div
        class="bg-white rounded-2xl border border-red-200 p-5 shadow-sm"
      >

        <p class="text-sm text-red-600">
          Absent
        </p>

        <p
          class="text-2xl font-bold text-red-700 mt-2"
        >
          {{ totalAbsent }}
        </p>

      </div>


      <!-- LATE -->

      <div
        class="bg-white rounded-2xl border border-yellow-200 p-5 shadow-sm"
      >

        <p class="text-sm text-yellow-600">
          Late
        </p>

        <p
          class="text-2xl font-bold text-yellow-700 mt-2"
        >
          {{ totalLate }}
        </p>

      </div>


      <!-- RATE -->

      <div
        class="bg-white rounded-2xl border border-blue-200 p-5 shadow-sm"
      >

        <p class="text-sm text-blue-600">
          Attendance Rate
        </p>

        <p
          class="text-2xl font-bold text-blue-700 mt-2"
        >
          {{ attendanceRate }}%
        </p>

      </div>

    </div>


    <!-- ================================= -->
    <!-- ATTENDANCE FORM -->
    <!-- ================================= -->

    <AttendanceForm
      v-if="showForm"
      :editing-record="editingRecord"
      :students="students"
      @save="saveAttendance"
      @cancel="closeForm"
    />


    <!-- ================================= -->
    <!-- SEARCH AND FILTER -->
    <!-- ================================= -->

    <div
      v-if="!showForm"
      class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"
    >

      <div
        class="flex flex-col lg:flex-row gap-4"
      >


        <!-- SEARCH -->

        <div class="flex-1 relative">

          <span
            class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          >
            🔍
          </span>

          <input
            v-model="search"
            type="text"
            placeholder="Search student, ID, date, status..."
            class="w-full border border-slate-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>


        <!-- FILTER -->

        <select
          v-model="statusFilter"
          class="lg:w-48 border border-slate-200 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
        >

          <option value="All">
            All Status
          </option>

          <option value="Present">
            Present
          </option>

          <option value="Absent">
            Absent
          </option>

          <option value="Late">
            Late
          </option>

          <option value="Excused">
            Excused
          </option>

        </select>

      </div>

    </div>


    <!-- ================================= -->
    <!-- TABLE -->
    <!-- ================================= -->

    <div
      v-if="!showForm"
      class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
    >


      <!-- TABLE HEADER -->

      <div
        class="px-6 py-5 border-b border-slate-200"
      >

        <h2
          class="font-bold text-slate-900"
        >
          Attendance Records
        </h2>

        <p
          class="text-sm text-slate-500 mt-1"
        >
          {{ filteredAttendance.length }}
          records found
        </p>

      </div>


      <!-- TABLE -->

      <div class="overflow-x-auto">

        <table class="w-full">


          <!-- TABLE HEAD -->

          <thead>

            <tr
              class="bg-slate-50 text-left"
            >

              <th
                class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase"
              >
                Student
              </th>

              <th
                class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase"
              >
                Course
              </th>

              <th
                class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase"
              >
                Date
              </th>

              <th
                class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase"
              >
                Status
              </th>

              <th
                class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase"
              >
                Remarks
              </th>

              <th
                class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right"
              >
                Actions
              </th>

            </tr>

          </thead>


          <!-- TABLE BODY -->

          <tbody
            class="divide-y divide-slate-100"
          >

            <tr
              v-for="record in filteredAttendance"
              :key="record.id"
              class="hover:bg-slate-50 transition"
            >


              <!-- STUDENT -->

              <td class="px-6 py-4">

                <div
                  class="flex items-center gap-3"
                >

                  <div
                    class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold"
                  >
                    {{
                      getStudentName(
                        record.studentId
                      ).charAt(0)
                    }}
                  </div>


                  <div>

                    <p
                      class="font-semibold text-slate-800"
                    >
                      {{
                        getStudentName(
                          record.studentId
                        )
                      }}
                    </p>

                    <p
                      class="text-xs text-slate-500"
                    >
                      {{ record.studentId }}
                    </p>

                  </div>

                </div>

              </td>


              <!-- COURSE -->

              <td class="px-6 py-4">

                <span
                  class="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium"
                >
                  {{
                    getStudentCourse(
                      record.studentId
                    )
                  }}
                </span>

              </td>


              <!-- DATE -->

              <td
                class="px-6 py-4 text-sm text-slate-600"
              >
                {{ formatDate(record.date) }}
              </td>


              <!-- STATUS -->

              <td class="px-6 py-4">


                <span
                  v-if="record.status === 'Present'"
                  class="inline-flex px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold"
                >
                  ✓ Present
                </span>


                <span
                  v-else-if="record.status === 'Absent'"
                  class="inline-flex px-3 py-1 rounded-full bg-red-100 text-red-700 text-sm font-semibold"
                >
                  ✕ Absent
                </span>


                <span
                  v-else-if="record.status === 'Late'"
                  class="inline-flex px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-semibold"
                >
                  ◷ Late
                </span>


                <span
                  v-else
                  class="inline-flex px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold"
                >
                  ✓ Excused
                </span>

              </td>


              <!-- REMARKS -->

              <td
                class="px-6 py-4 text-sm text-slate-600"
              >
                {{ record.remarks || '—' }}
              </td>


              <!-- ACTIONS -->

              <td
                class="px-6 py-4 text-right whitespace-nowrap"
              >

                <button
                  @click="openEditForm(record)"
                  class="text-blue-600 hover:text-blue-800 font-medium text-sm mr-4"
                >
                  Edit
                </button>


                <button
                  @click="removeAttendance(record)"
                  class="text-red-500 hover:text-red-700 font-medium text-sm"
                >
                  Delete
                </button>

              </td>

            </tr>

          </tbody>

        </table>

      </div>


      <!-- ================================= -->
      <!-- EMPTY STATE -->
      <!-- ================================= -->

      <div
        v-if="filteredAttendance.length === 0"
        class="p-12 text-center"
      >

        <div class="text-4xl mb-3">
          📋
        </div>

        <h3
          class="font-bold text-slate-800"
        >
          No attendance records found
        </h3>

        <p
          class="text-sm text-slate-500 mt-1"
        >
          Try changing your search or filter,
          or record a new attendance.
        </p>

      </div>

    </div>


    <!-- ================================= -->
    <!-- DELETE DIALOG -->
    <!-- ================================= -->

    <ConfirmDialog
      :show="showDeleteDialog"
      title="Delete Attendance Record?"
      :message="
        recordToDelete
          ? `Delete the attendance record for ${getStudentName(recordToDelete.studentId)} on ${formatDate(recordToDelete.date)}?`
          : ''
      "
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />


    <!-- ================================= -->
    <!-- TOAST -->
    <!-- ================================= -->

    <Toast
      :show="showToast"
      :message="message"
      :type="messageType"
    />

  </div>

</template>
