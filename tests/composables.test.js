import { beforeEach, describe, expect, it, vi } from 'vitest'

const loadComposables = async () => {
  vi.resetModules()
  localStorage.clear()

  const { useStudents } = await import('../src/composables/useStudents.js')
  const { useAttendance } = await import('../src/composables/useAttendance.js')

  return { ...useStudents(), ...useAttendance() }
}

describe('Attendance Monitoring System', () => {
  let system

  beforeEach(async () => {
    system = await loadComposables()
  })

  it('adds a student and saves normalized data', () => {
    const result = system.addStudent({ id: ' 2026-001 ', name: ' Ana Cruz ', course: ' BSCS 3A ' })

    expect(result).toMatchObject({ success: true })
    expect(system.students.value).toEqual([{ id: '2026-001', name: 'Ana Cruz', course: 'BSCS 3A' }])
    expect(JSON.parse(localStorage.getItem('students'))).toHaveLength(1)
  })

  it('rejects a duplicate student ID', () => {
    system.addStudent({ id: '2026-001', name: 'Ana Cruz', course: 'BSCS 3A' })

    expect(system.addStudent({ id: '2026-001', name: 'Ben Reyes', course: 'BSIT 3A' }))
      .toEqual({ success: false, message: 'Student ID already exists.' })
  })

  it('updates a student ID and its attendance reference', () => {
    system.addStudent({ id: '2026-001', name: 'Ana Cruz', course: 'BSCS 3A' })
    system.addAttendance({ studentId: '2026-001', date: '2026-08-28', status: 'Present' })

    const result = system.updateStudent({ originalId: '2026-001', id: '2026-010', name: 'Ana Cruz', course: 'BSCS 3A' })

    expect(result.success).toBe(true)
    expect(system.students.value[0].id).toBe('2026-010')
    expect(system.attendance.value[0].studentId).toBe('2026-010')
  })

  it('searches attendance records and filters by status', () => {
    system.addAttendance({ studentId: '2026-001', date: '2026-08-28', status: 'Present', remarks: 'On time' })
    system.addAttendance({ studentId: '2026-002', date: '2026-08-28', status: 'Absent' })

    expect(system.searchAttendance('on time', 'All')).toHaveLength(1)
    expect(system.searchAttendance('', 'Absent')).toEqual([expect.objectContaining({ studentId: '2026-002' })])
  })

  it('validates required attendance data and prevents duplicate daily records', () => {
    expect(system.addAttendance({ studentId: '', date: '', status: 'Present' }))
      .toEqual({ success: false, message: 'Please select a student.' })

    system.addAttendance({ studentId: '2026-001', date: '2026-08-28', status: 'Late' })
    expect(system.addAttendance({ studentId: '2026-001', date: '2026-08-28', status: 'Present' }))
      .toEqual({ success: false, message: 'This student already has an attendance record for this date.' })
  })

  it('removes dependent attendance records when a student is deleted (defect regression)', () => {
    system.addStudent({ id: '2026-001', name: 'Ana Cruz', course: 'BSCS 3A' })
    system.addStudent({ id: '2026-002', name: 'Ben Reyes', course: 'BSIT 3A' })
    system.addAttendance({ studentId: '2026-001', date: '2026-08-28', status: 'Present' })
    system.addAttendance({ studentId: '2026-002', date: '2026-08-28', status: 'Absent' })

    expect(system.deleteStudent('2026-001').success).toBe(true)
    expect(system.students.value).toEqual([expect.objectContaining({ id: '2026-002' })])
    expect(system.attendance.value).toEqual([expect.objectContaining({ studentId: '2026-002' })])
    expect(JSON.parse(localStorage.getItem('attendance_records'))).toHaveLength(1)
  })
})
