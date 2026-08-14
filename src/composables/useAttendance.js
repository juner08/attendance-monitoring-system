import { computed, ref } from 'vue'

const STORAGE_KEY = 'attendance_records'
const VALID_STATUSES = ['Present', 'Late', 'Absent', 'Excused']
const attendance = ref([])

const loadAttendance = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    const records = saved ? JSON.parse(saved) : []
    attendance.value = Array.isArray(records) ? records : []
  } catch {
    attendance.value = []
  }
}

const saveAttendanceData = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(attendance.value))

const totalAttendance = computed(() => attendance.value.length)
const totalPresent = computed(() => attendance.value.filter(record => record.status === 'Present').length)
const totalAbsent = computed(() => attendance.value.filter(record => record.status === 'Absent').length)
const totalLate = computed(() => attendance.value.filter(record => record.status === 'Late').length)
const totalExcused = computed(() => attendance.value.filter(record => record.status === 'Excused').length)
const attendanceRate = computed(() => totalAttendance.value
  ? Math.round(((totalPresent.value + totalLate.value) / totalAttendance.value) * 100)
  : 0)

const searchAttendance = (search = '', status = 'All') => {
  const keyword = search.toLowerCase().trim()
  return attendance.value.filter(record => {
    const matchesSearch = !keyword || [record.studentId, record.date, record.status, record.remarks || '']
      .some(value => String(value).toLowerCase().includes(keyword))
    return matchesSearch && (status === 'All' || record.status === status)
  })
}

const normalizeRecord = (record) => ({
  studentId: String(record.studentId || '').trim(),
  date: String(record.date || '').trim(),
  status: VALID_STATUSES.includes(record.status) ? record.status : 'Present',
  remarks: String(record.remarks || '').trim()
})

const validateRecord = (record) => {
  if (!record.studentId) return 'Please select a student.'
  if (!record.date) return 'Please select a date.'
  return ''
}

const addAttendance = (record) => {
  const normalized = normalizeRecord(record)
  const error = validateRecord(normalized)
  if (error) return { success: false, message: error }
  if (attendance.value.some(existing => existing.studentId === normalized.studentId && existing.date === normalized.date)) {
    return { success: false, message: 'This student already has an attendance record for this date.' }
  }
  attendance.value.push({ id: Date.now(), ...normalized })
  saveAttendanceData()
  return { success: true, message: 'Attendance recorded successfully.' }
}

const updateAttendance = (record) => {
  if (!record.id) return { success: false, message: 'Invalid attendance record.' }
  const normalized = normalizeRecord(record)
  const error = validateRecord(normalized)
  if (error) return { success: false, message: error }
  const index = attendance.value.findIndex(existing => existing.id === record.id)
  if (index === -1) return { success: false, message: 'Attendance record not found.' }
  if (attendance.value.some(existing => existing.id !== record.id && existing.studentId === normalized.studentId && existing.date === normalized.date)) {
    return { success: false, message: 'This student already has another attendance record for this date.' }
  }
  attendance.value[index] = { ...attendance.value[index], ...normalized }
  saveAttendanceData()
  return { success: true, message: 'Attendance updated successfully.' }
}

const deleteAttendance = (id) => {
  const index = attendance.value.findIndex(record => record.id === id)
  if (index === -1) return { success: false, message: 'Attendance record not found.' }
  attendance.value.splice(index, 1)
  saveAttendanceData()
  return { success: true, message: 'Attendance deleted successfully.' }
}

const updateStudentIdReferences = (oldStudentId, newStudentId) => {
  if (oldStudentId === newStudentId) return
  attendance.value.forEach(record => {
    if (record.studentId === oldStudentId) record.studentId = newStudentId
  })
  saveAttendanceData()
}

loadAttendance()

export const useAttendance = () => ({
  attendance,
  totalAttendance,
  totalPresent,
  totalAbsent,
  totalLate,
  totalExcused,
  attendanceRate,
  searchAttendance,
  addAttendance,
  updateAttendance,
  deleteAttendance,
  updateStudentIdReferences
})
