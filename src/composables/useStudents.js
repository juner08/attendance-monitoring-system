import { ref } from 'vue'
import { useAttendance } from './useAttendance'

const STORAGE_KEY = 'students'

const students = ref([])


// ======================================
// LOAD STUDENTS
// ======================================

const loadStudents = () => {

  const saved =
    localStorage.getItem(STORAGE_KEY)

  if (saved) {

    try {

      students.value =
        JSON.parse(saved)

    } catch {

      students.value = []

    }

  }

}


// ======================================
// SAVE STUDENTS
// ======================================

const saveStudents = () => {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(students.value)
  )

}


// ======================================
// ADD STUDENT
// ======================================

const addStudent = (student) => {

  const id = String(student.id || '').trim()
  const name = String(student.name || '').trim()
  const course = String(student.course || '').trim()

  if (!id) {

    return {
      success: false,
      message: 'Student ID is required.'
    }

  }


  if (!name) {

    return {
      success: false,
      message: 'Student name is required.'
    }

  }


  if (!course) {

    return {
      success: false,
      message: 'Course is required.'
    }

  }


  // CHECK DUPLICATE ID

  const existing =
    students.value.find(
      item =>
        item.id === id
    )


  if (existing) {

    return {
      success: false,
      message:
        'Student ID already exists.'
    }

  }


  students.value.push({

    id,

    name,

    course

  })


  saveStudents()


  return {
    success: true,
    message:
      'Student added successfully.'
  }

}


// ======================================
// UPDATE STUDENT
// ======================================

const updateStudent = (student) => {

  const originalId = String(student.originalId || student.id).trim()
  const newId = String(student.id || '').trim()
  const name = String(student.name || '').trim()
  const course = String(student.course || '').trim()

  const index =
    students.value.findIndex(
      item =>
        item.id === originalId
    )


  if (index === -1) {

    return {
      success: false,
      message:
        'Student not found.'
    }

  }


  if (!newId) {
    return {
      success: false,
      message: 'Student ID is required.'
    }
  }

  if (!name) {

    return {
      success: false,
      message:
        'Student name is required.'
    }

  }


  if (!course) {

    return {
      success: false,
      message:
        'Course is required.'
    }

  }

  const duplicate = students.value.find(
    item => item.id === newId && item.id !== originalId
  )

  if (duplicate) {
    return {
      success: false,
      message: 'Student ID already exists.'
    }
  }


  students.value[index] = {

    id: newId,

    name,

    course

  }


  saveStudents()

  const { updateStudentIdReferences } = useAttendance()
  updateStudentIdReferences(originalId, newId)


  return {
    success: true,
    message:
      'Student updated successfully.'
  }

}


// ======================================
// DELETE STUDENT
// ======================================

const deleteStudent = (studentId) => {

  const index =
    students.value.findIndex(
      student =>
        student.id === studentId
    )


  if (index === -1) {

    return {
      success: false,
      message:
        'Student not found.'
    }

  }


  students.value.splice(
    index,
    1
  )


  saveStudents()


  return {
    success: true,
    message:
      'Student deleted successfully.'
  }

}


// ======================================
// INITIAL LOAD
// ======================================

loadStudents()


// ======================================
// EXPORT
// ======================================

export const useStudents = () => {

  return {

    students,

    addStudent,

    updateStudent,

    deleteStudent

  }

}
