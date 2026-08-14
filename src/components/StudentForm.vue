<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  editingStudent: {
    type: Object,
    default: null
  }
})

const emit = defineEmits([
  'save',
  'cancel'
])

const form = reactive({
  id: '',
  name: '',
  course: '',
  section: '',
  email: ''
})

const errors = reactive({
  id: '',
  name: '',
  course: '',
  section: '',
  email: ''
})

const resetForm = () => {
  form.id = ''
  form.name = ''
  form.course = ''
  form.section = ''
  form.email = ''

  clearErrors()
}

const clearErrors = () => {
  errors.id = ''
  errors.name = ''
  errors.course = ''
  errors.section = ''
  errors.email = ''
}

watch(
  () => props.editingStudent,
  (student) => {
    if (student) {
      form.id = student.id
      form.name = student.name
      form.course = student.course
      form.section = student.section
      form.email = student.email || ''
    } else {
      resetForm()
    }
  },
  { immediate: true }
)

const validate = () => {
  clearErrors()

  let valid = true

  if (!form.id.trim()) {
    errors.id = 'Student ID is required.'
    valid = false
  }

  if (!form.name.trim()) {
    errors.name = 'Student name is required.'
    valid = false
  }

  if (!form.course) {
    errors.course = 'Please select a course.'
    valid = false
  }

  if (!form.section.trim()) {
    errors.section = 'Section is required.'
    valid = false
  }

  if (
    form.email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
  ) {
    errors.email = 'Please enter a valid email address.'
    valid = false
  }

  return valid
}

const submitForm = () => {
  if (!validate()) {
    return
  }

  emit('save', {
    id: form.id.trim(),
    name: form.name.trim(),
    course: form.course,
    section: form.section.trim(),
    email: form.email.trim()
  })
}

const cancelForm = () => {
  resetForm()
  emit('cancel')
}
</script>

<template>
  <div class="bg-white rounded-2xl border border-slate-200 shadow-sm">

    <!-- Header -->
    <div class="px-6 py-5 border-b border-slate-200">

      <h2 class="text-lg font-bold text-slate-900">
        {{ editingStudent ? 'Edit Student' : 'Add New Student' }}
      </h2>

      <p class="text-sm text-slate-500 mt-1">
        {{
          editingStudent
            ? 'Update the student information below.'
            : 'Enter the student information below.'
        }}
      </p>

    </div>

    <!-- Form -->
    <form
      @submit.prevent="submitForm"
      class="p-6 space-y-5"
    >

      <!-- Student ID -->
      <div>

        <label
          for="studentId"
          class="block text-sm font-semibold text-slate-700 mb-2"
        >
          Student ID
        </label>

        <input
          id="studentId"
          v-model="form.id"
          type="text"
          placeholder="e.g. 2026-001"
          class="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          :class="{ 'border-red-500': errors.id }"
        />

        <p
          v-if="errors.id"
          class="text-sm text-red-500 mt-1"
        >
          {{ errors.id }}
        </p>

      </div>

      <!-- Name -->
      <div>

        <label
          for="studentName"
          class="block text-sm font-semibold text-slate-700 mb-2"
        >
          Full Name
        </label>

        <input
          id="studentName"
          v-model="form.name"
          type="text"
          placeholder="e.g. Juan Dela Cruz"
          class="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          :class="{ 'border-red-500': errors.name }"
        />

        <p
          v-if="errors.name"
          class="text-sm text-red-500 mt-1"
        >
          {{ errors.name }}
        </p>

      </div>

      <!-- Course -->
      <div>

        <label
          for="course"
          class="block text-sm font-semibold text-slate-700 mb-2"
        >
          Course
        </label>

        <select
          id="course"
          v-model="form.course"
          class="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-blue-500"
          :class="{ 'border-red-500': errors.course }"
        >
          <option value="">
            Select course
          </option>

          <option value="BSCS">
            BSCS
          </option>

          <option value="BSIT">
            BSIT
          </option>

          <option value="BSBA">
            BSBA
          </option>

        </select>

        <p
          v-if="errors.course"
          class="text-sm text-red-500 mt-1"
        >
          {{ errors.course }}
        </p>

      </div>

      <!-- Section -->
      <div>

        <label
          for="section"
          class="block text-sm font-semibold text-slate-700 mb-2"
        >
          Section
        </label>

        <input
          id="section"
          v-model="form.section"
          type="text"
          placeholder="e.g. 3A"
          class="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          :class="{ 'border-red-500': errors.section }"
        />

        <p
          v-if="errors.section"
          class="text-sm text-red-500 mt-1"
        >
          {{ errors.section }}
        </p>

      </div>

      <!-- Email -->
      <div>

        <label
          for="email"
          class="block text-sm font-semibold text-slate-700 mb-2"
        >
          Email
          <span class="text-slate-400 font-normal">
            (Optional)
          </span>
        </label>

        <input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="student@example.com"
          class="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          :class="{ 'border-red-500': errors.email }"
        />

        <p
          v-if="errors.email"
          class="text-sm text-red-500 mt-1"
        >
          {{ errors.email }}
        </p>

      </div>

      <!-- Buttons -->
      <div class="flex justify-end gap-3 pt-3">

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
          {{ editingStudent ? 'Update Student' : 'Save Student' }}
        </button>

      </div>

    </form>

  </div>
</template>