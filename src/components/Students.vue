<script setup>
import { computed, ref } from 'vue'
import { useStudents } from '../composables/useStudents'

const { students, addStudent, updateStudent, deleteStudent } = useStudents()
const search = ref('')
const yearFilter = ref('All')
const sectionFilter = ref('All')
const showForm = ref(false)
const editingStudent = ref(null)
const message = ref('')
const form = ref({ id: '', name: '', course: 'BSCS', yearLevel: '1', section: 'A' })

const years = computed(() => [...new Set(students.value.map(student => student.yearLevel).filter(Boolean))].sort((a, b) => Number(a) - Number(b)))
const sections = computed(() => [...new Set(students.value
  .filter(student => yearFilter.value === 'All' || student.yearLevel === yearFilter.value)
  .map(student => student.section).filter(Boolean))].sort())

const filteredStudents = computed(() => {
  const keyword = search.value.toLowerCase().trim()
  return students.value.filter(student => {
    const matchesSearch = !keyword || [student.id, student.name, student.course, student.yearLevel, student.section]
      .some(value => String(value || '').toLowerCase().includes(keyword))
    return matchesSearch && (yearFilter.value === 'All' || student.yearLevel === yearFilter.value)
      && (sectionFilter.value === 'All' || student.section === sectionFilter.value)
  })
})

const groupedStudents = computed(() => years.value.map(year => ({
  year,
  sections: [...new Set(students.value.filter(student => student.yearLevel === year).map(student => student.section))]
    .sort()
    .map(section => ({ section, count: students.value.filter(student => student.yearLevel === year && student.section === section).length }))
})))

const formatGroup = (student) => student.course.endsWith(`${student.yearLevel}${student.section}`)
  ? student.course
  : `${student.course} ${student.yearLevel}${student.section}`
const chooseGroup = (year, section) => { yearFilter.value = year; sectionFilter.value = section }
const resetFilters = () => { yearFilter.value = 'All'; sectionFilter.value = 'All' }
const openAddForm = () => { editingStudent.value = null; form.value = { id: '', name: '', course: 'BSCS', yearLevel: '1', section: 'A' }; message.value = ''; showForm.value = true }
const openEditForm = (student) => { editingStudent.value = student; form.value = { ...student }; message.value = ''; showForm.value = true }
const closeForm = () => { showForm.value = false; editingStudent.value = null }
const saveStudent = () => {
  const result = editingStudent.value
    ? updateStudent({ ...form.value, originalId: editingStudent.value.id })
    : addStudent(form.value)
  message.value = result.message
  if (result.success) closeForm()
}
const removeStudent = (student) => {
  if (confirm(`Are you sure you want to delete ${student.name}?`)) message.value = deleteStudent(student.id).message
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div><h1 class="text-2xl font-bold text-slate-900">Students</h1><p class="text-slate-500 mt-1">Organize and manage students by year level and section.</p></div>
      <button @click="openAddForm" class="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 transition">+ Add Student</button>
    </div>

    <div v-if="message" class="bg-blue-50 border border-blue-200 text-blue-700 rounded-xl px-4 py-3">{{ message }}</div>

    <div v-if="!showForm" class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div class="flex items-center justify-between gap-3 mb-4"><div><h2 class="font-bold text-slate-900">Browse by class</h2><p class="text-sm text-slate-500 mt-1">Choose a section to show its students.</p></div><button v-if="yearFilter !== 'All' || sectionFilter !== 'All'" @click="resetFilters" class="text-sm font-semibold text-blue-600">Clear filters</button></div>
      <div v-if="groupedStudents.length" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div v-for="group in groupedStudents" :key="group.year" class="rounded-xl border border-slate-200 p-4"><p class="font-bold text-slate-800">{{ group.year }}{{ ['1', '2', '3'].includes(group.year) ? ['st', 'nd', 'rd'][Number(group.year) - 1] : 'th' }} Year</p><div class="flex flex-wrap gap-2 mt-3"><button v-for="item in group.sections" :key="item.section" @click="chooseGroup(group.year, item.section)" class="rounded-lg bg-blue-50 text-blue-700 px-3 py-2 text-sm font-semibold hover:bg-blue-100">{{ item.section }} · {{ item.count }}</button></div></div>
      </div>
      <p v-else class="text-sm text-slate-500">No student groups yet.</p>
    </div>

    <form v-if="showForm" @submit.prevent="saveStudent" class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
      <div><h2 class="text-xl font-bold text-slate-900">{{ editingStudent ? 'Edit Student' : 'Add Student' }}</h2><p class="text-sm text-slate-500 mt-1">Enter both the year level and section to keep the class list organized.</p></div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label class="block text-sm font-semibold text-slate-700">Student ID<input v-model="form.id" required class="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. 2026-001"></label>
        <label class="block text-sm font-semibold text-slate-700">Student name<input v-model="form.name" required class="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 font-normal outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter student name"></label>
        <label class="block text-sm font-semibold text-slate-700">Course<select v-model="form.course" class="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 font-normal bg-white outline-none focus:ring-2 focus:ring-blue-500"><option>BSCS</option><option>BSIT</option><option>BSBA</option></select></label>
        <label class="block text-sm font-semibold text-slate-700">Year level<select v-model="form.yearLevel" class="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 font-normal bg-white outline-none focus:ring-2 focus:ring-blue-500"><option value="1">1st Year</option><option value="2">2nd Year</option><option value="3">3rd Year</option><option value="4">4th Year</option></select></label>
        <label class="block text-sm font-semibold text-slate-700">Section<input v-model="form.section" required maxlength="5" class="mt-2 w-full border border-slate-200 rounded-xl px-4 py-3 font-normal uppercase outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. A"></label>
      </div>
      <div class="flex justify-end gap-3"><button type="button" @click="closeForm" class="px-5 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold">Cancel</button><button class="px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold">{{ editingStudent ? 'Update Student' : 'Save Student' }}</button></div>
    </form>

    <div v-if="!showForm" class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3"><input v-model="search" class="border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Search name, ID, course…"><select v-model="yearFilter" @change="sectionFilter = 'All'" class="border border-slate-200 rounded-xl px-4 py-3 bg-white"><option value="All">All year levels</option><option v-for="year in years" :key="year" :value="year">Year {{ year }}</option></select><select v-model="sectionFilter" class="border border-slate-200 rounded-xl px-4 py-3 bg-white"><option value="All">All sections</option><option v-for="section in sections" :key="section" :value="section">Section {{ section }}</option></select></div>
    </div>

    <div v-if="!showForm" class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"><div class="px-6 py-5 border-b border-slate-200"><h2 class="font-bold text-slate-900">Student List</h2><p class="text-sm text-slate-500 mt-1">{{ filteredStudents.length }} students found</p></div><div class="overflow-x-auto"><table class="w-full"><thead><tr class="bg-slate-50 text-left"><th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Student</th><th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Class</th><th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase text-right">Actions</th></tr></thead><tbody class="divide-y divide-slate-100"><tr v-for="student in filteredStudents" :key="student.id" class="hover:bg-slate-50"><td class="px-6 py-4"><p class="font-semibold text-slate-800">{{ student.name }}</p><p class="text-sm text-slate-500">{{ student.id }}</p></td><td class="px-6 py-4"><span class="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium">{{ formatGroup(student) }}</span></td><td class="px-6 py-4 text-right whitespace-nowrap"><button @click="openEditForm(student)" class="text-blue-600 font-medium text-sm mr-4">Edit</button><button @click="removeStudent(student)" class="text-red-500 font-medium text-sm">Delete</button></td></tr><tr v-if="!filteredStudents.length"><td colspan="3" class="px-6 py-12 text-center text-slate-500">No students found for this selection.</td></tr></tbody></table></div></div>
  </div>
</template>
