import { ref } from 'vue'
import { useAttendance } from './useAttendance'

const STORAGE_KEY = 'students'
const students = ref([])

// Old records such as "BSCS 3A" are converted automatically on load.
const normalizeStudent = (student) => {
  const rawCourse = String(student.course || '').trim()
  const legacy = rawCourse.match(/^(.*?)(?:\s+)([1-9]\d*)\s*([A-Za-z])$/)
  return {
    id: String(student.id || '').trim(),
    name: String(student.name || '').trim(),
    // Keep the original course text for backward-compatible reports.
    course: rawCourse,
    yearLevel: String(student.yearLevel || legacy?.[2] || '').trim(),
    section: String(student.section || legacy?.[3] || '').trim().toUpperCase(),
    email: String(student.email || '').trim()
  }
}

const loadStudents = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    students.value = Array.isArray(saved) ? saved.map(normalizeStudent) : []
  } catch {
    students.value = []
  }
}

const saveStudents = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(students.value))

const validate = (student) => {
  if (!student.id) return 'Student ID is required.'
  if (!student.name) return 'Student name is required.'
  if (!student.course) return 'Course is required.'
  if (!student.yearLevel || !student.section) return 'Year level and section are required.'
  return ''
}

const addStudent = (student) => {
  const normalized = normalizeStudent(student)
  const error = validate(normalized)
  if (error) return { success: false, message: error }
  if (students.value.some(item => item.id === normalized.id)) return { success: false, message: 'Student ID already exists.' }
  students.value.push(normalized)
  saveStudents()
  return { success: true, message: 'Student added successfully.' }
}

const updateStudent = (student) => {
  const originalId = String(student.originalId || student.id || '').trim()
  const normalized = normalizeStudent(student)
  const index = students.value.findIndex(item => item.id === originalId)
  if (index === -1) return { success: false, message: 'Student not found.' }
  const error = validate(normalized)
  if (error) return { success: false, message: error }
  if (students.value.some(item => item.id === normalized.id && item.id !== originalId)) return { success: false, message: 'Student ID already exists.' }
  students.value[index] = normalized
  saveStudents()
  useAttendance().updateStudentIdReferences(originalId, normalized.id)
  return { success: true, message: 'Student updated successfully.' }
}

const deleteStudent = (studentId) => {
  const index = students.value.findIndex(student => student.id === studentId)
  if (index === -1) return { success: false, message: 'Student not found.' }
  students.value.splice(index, 1)
  useAttendance().deleteStudentAttendance(studentId)
  saveStudents()
  return { success: true, message: 'Student deleted successfully.' }
}

loadStudents()

export const useStudents = () => ({ students, addStudent, updateStudent, deleteStudent })
