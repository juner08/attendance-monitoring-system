<script setup>
import { ref, computed } from 'vue'

import { useStudents } from '../composables/useStudents'


const {
  students,
  addStudent,
  updateStudent,
  deleteStudent
} = useStudents()


// ======================================
// STATE
// ======================================

const search = ref('')

const showForm = ref(false)

const editingStudent = ref(null)

const studentName = ref('')

const studentCourse = ref('')

const studentId = ref('')

const message = ref('')


// ======================================
// FILTER STUDENTS
// ======================================

const filteredStudents = computed(() => {

  const keyword =
    search.value
      .toLowerCase()
      .trim()

  if (!keyword) {

    return students.value

  }

  return students.value.filter(
    student =>

      String(student.name)
        .toLowerCase()
        .includes(keyword)

      ||

      String(student.id)
        .toLowerCase()
        .includes(keyword)

      ||

      String(student.course)
        .toLowerCase()
        .includes(keyword)
  )

})


// ======================================
// OPEN ADD FORM
// ======================================

const openAddForm = () => {

  editingStudent.value = null

  studentName.value = ''

  studentId.value = ''

  studentCourse.value = ''

  message.value = ''

  showForm.value = true

}


// ======================================
// OPEN EDIT FORM
// ======================================

const openEditForm = (student) => {

  editingStudent.value = student

  studentName.value =
    student.name

  studentId.value =
    student.id

  studentCourse.value =
    student.course

  message.value = ''

  showForm.value = true

}


// ======================================
// CLOSE FORM
// ======================================

const closeForm = () => {

  showForm.value = false

  editingStudent.value = null

  studentName.value = ''

  studentId.value = ''

  studentCourse.value = ''

}


// ======================================
// SAVE STUDENT
// ======================================

const saveStudent = () => {

  if (
    !studentName.value.trim() ||
    !studentId.value.trim() ||
    !studentCourse.value.trim()
  ) {

    message.value =
      'Please complete all fields.'

    return

  }


  let result


  if (editingStudent.value) {

    result = updateStudent({

      ...editingStudent.value,

      originalId:
        editingStudent.value.id,

      id:
        studentId.value.trim(),

      name:
        studentName.value.trim(),

      course:
        studentCourse.value.trim()

    })

  } else {

    result = addStudent({

      id:
        studentId.value.trim(),

      name:
        studentName.value.trim(),

      course:
        studentCourse.value.trim()

    })

  }


  message.value =
    result.message


  if (result.success) {

    closeForm()

  }

}


// ======================================
// DELETE STUDENT
// ======================================

const removeStudent = (student) => {

  const confirmed = confirm(
    `Are you sure you want to delete ${student.name}?`
  )

  if (!confirmed) {
    return
  }

  const result = deleteStudent(student.id)

  message.value = result.message
}

</script>


<template>

  <div class="space-y-6">


    <!-- ================================= -->
    <!-- HEADER -->
    <!-- ================================= -->

    <div class="page-heading flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

      <div>

        <h1
          class="text-2xl font-bold text-slate-900"
        >
          Students
        </h1>

        <p class="text-slate-500 mt-1">
          Manage registered students.
        </p>

      </div>


      <button
        @click="openAddForm"
        class="primary-action bg-blue-600 text-white px-5 py-3 rounded-2xl font-semibold hover:bg-blue-700 transition"
      >
        + Add Student
      </button>

    </div>


    <!-- ================================= -->
    <!-- MESSAGE -->
    <!-- ================================= -->

    <div
      v-if="message"
      class="bg-blue-50 border border-blue-200 text-blue-700 rounded-xl px-4 py-3"
    >

      {{ message }}

    </div>


    <!-- ================================= -->
    <!-- ADD / EDIT FORM -->
    <!-- ================================= -->

    <div
      v-if="showForm"
      class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
    >

      <h2
        class="text-xl font-bold text-slate-900 mb-5"
      >

        {{
          editingStudent
            ? 'Edit Student'
            : 'Add Student'
        }}

      </h2>


      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">


        <!-- ID -->

        <div>

          <label
            class="block text-sm font-semibold text-slate-700 mb-2"
          >
            Student ID
          </label>

          <input
            v-model="studentId"
            type="text"
            placeholder="e.g. 2026-001"
            class="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>


        <!-- NAME -->

        <div>

          <label
            class="block text-sm font-semibold text-slate-700 mb-2"
          >
            Student Name
          </label>

          <input
            v-model="studentName"
            type="text"
            placeholder="Enter student name"
            class="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>


        <!-- COURSE -->

        <div>

          <label
            class="block text-sm font-semibold text-slate-700 mb-2"
          >
            Course
          </label>

          <input
            v-model="studentCourse"
            type="text"
            placeholder="e.g. BSCS 3A"
            class="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

      </div>


      <!-- BUTTONS -->

      <div
        class="flex justify-end gap-3 mt-5"
      >

        <button
          @click="closeForm"
          class="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50"
        >
          Cancel
        </button>


        <button
          @click="saveStudent"
          class="px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
        >

          {{
            editingStudent
              ? 'Update Student'
              : 'Save Student'
          }}

        </button>

      </div>

    </div>


    <!-- ================================= -->
    <!-- SEARCH -->
    <!-- ================================= -->

    <div
      v-if="!showForm"
      class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"
    >

      <div class="relative">

        <span
          class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        >
          🔍
        </span>

        <input
          v-model="search"
          type="text"
          placeholder="Search student name, ID, or course..."
          class="w-full border border-slate-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

    </div>


    <!-- ================================= -->
    <!-- STUDENT TABLE -->
    <!-- ================================= -->

    <div
      v-if="!showForm"
      class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
    >

      <div
        class="px-6 py-5 border-b border-slate-200"
      >

        <h2
          class="font-bold text-slate-900"
        >
          Student List
        </h2>

        <p
          class="text-sm text-slate-500 mt-1"
        >
          {{ filteredStudents.length }}
          students found
        </p>

      </div>


      <div class="overflow-x-auto">

        <table class="w-full">


          <thead>

            <tr
              class="bg-slate-50 text-left"
            >

              <th
                class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase"
              >
                Student ID
              </th>

              <th
                class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase"
              >
                Student Name
              </th>

              <th
                class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase"
              >
                Course
              </th>

              <th
                class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right"
              >
                Actions
              </th>

            </tr>

          </thead>


          <tbody
            class="divide-y divide-slate-100"
          >

            <tr
              v-for="student in filteredStudents"
              :key="student.id"
              class="hover:bg-slate-50 transition"
            >


              <!-- ID -->

              <td
                class="px-6 py-4 font-medium text-slate-700"
              >
                {{ student.id }}
              </td>


              <!-- NAME -->

              <td class="px-6 py-4">

                <div
                  class="flex items-center gap-3"
                >

                  <div
                    class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold"
                  >
                    {{
                      student.name
                        .charAt(0)
                        .toUpperCase()
                    }}
                  </div>

                  <span
                    class="font-semibold text-slate-800"
                  >
                    {{ student.name }}
                  </span>

                </div>

              </td>


              <!-- COURSE -->

              <td class="px-6 py-4">

                <span
                  class="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium"
                >
                  {{ student.course }}
                </span>

              </td>


              <!-- ACTIONS -->

              <td
                class="px-6 py-4 text-right whitespace-nowrap"
              >

                <button
                  @click="openEditForm(student)"
                  class="text-blue-600 hover:text-blue-800 font-medium text-sm mr-4"
                >
                  Edit
                </button>


                <button
                  @click="removeStudent(student)"
                  class="text-red-500 hover:text-red-700 font-medium text-sm"
                >
                  Delete
                </button>

              </td>

            </tr>


            <!-- EMPTY -->

            <tr
              v-if="
                filteredStudents.length === 0
              "
            >

              <td
                colspan="4"
                class="px-6 py-12 text-center"
              >

                <div class="text-4xl mb-3">
                  👨‍🎓
                </div>

                <h3
                  class="font-bold text-slate-800"
                >
                  No students found
                </h3>

                <p
                  class="text-sm text-slate-500 mt-1"
                >
                  Add a student or change your search.
                </p>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>

  </div>

</template>
