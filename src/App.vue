<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

import Sidebar from './components/Sidebar.vue'
import Topbar from './components/Topbar.vue'
import Dashboard from './components/Dashboard.vue'
import Students from './components/Students.vue'
import Attendance from './components/Attendance.vue'
import AuthGate from './components/AuthGate.vue'

import { useAttendance } from './composables/useAttendance'
import { useStudents } from './composables/useStudents'
import { useAuth } from './composables/useAuth'


// ======================================
// SYSTEM
// ======================================

const activePage = ref('dashboard')
const pageNames = ['dashboard', 'students', 'attendance', 'reports', 'settings']

const systemName = ref('Attendance Monitoring System')
const schoolName = ref('BSCS 3A')
const adminName = ref('Administrator')
const { currentUser, isAuthenticated, logout } = useAuth()

const darkMode = ref(false)


// ======================================
// ATTENDANCE
// ======================================

const {
  attendance
} = useAttendance()


// ======================================
// STUDENTS
// ======================================

const {
  students
} = useStudents()


// ======================================
// NAVIGATION
// ======================================

const changePage = (page) => {
  if (!pageNames.includes(page)) {
    return
  }

  activePage.value = page

  if (window.location.hash !== `#${page}`) {
    window.location.hash = page
  }
}

const syncPageFromHash = () => {
  const page = window.location.hash.slice(1)
  activePage.value = pageNames.includes(page) ? page : 'dashboard'
}


// ======================================
// TODAY'S DATE
// ======================================

const today = computed(() => {

  const date = new Date()

  const year =
    date.getFullYear()

  const month =
    String(date.getMonth() + 1)
      .padStart(2, '0')

  const day =
    String(date.getDate())
      .padStart(2, '0')

  return `${year}-${month}-${day}`
})


// ======================================
// TODAY'S ATTENDANCE
// ======================================

const todayAttendance = computed(() => {

  return attendance.value.filter(
    record =>
      record.date === today.value
  )

})


// ======================================
// PRESENT TODAY
// ======================================

const presentToday = computed(() => {

  return todayAttendance.value.filter(
    record =>
      record.status === 'Present'
  ).length

})


// ======================================
// LATE TODAY
// ======================================

const lateToday = computed(() => {

  return todayAttendance.value.filter(
    record =>
      record.status === 'Late'
  ).length

})


// ======================================
// ABSENT TODAY
// ======================================

const absentToday = computed(() => {

  return todayAttendance.value.filter(
    record =>
      record.status === 'Absent'
  ).length

})


// ======================================
// TODAY ATTENDANCE RATE
// ======================================

const todayAttendanceRate = computed(() => {

  if (students.value.length === 0) {
    return 0
  }

  return Math.round(
    (
      (
        presentToday.value +
        lateToday.value
      )
      /
      students.value.length
    ) * 100
  )

})


// ======================================
// REPORT DATA
// ======================================

const reportData = computed(() => {

  return students.value.map(student => {

    const records =
      attendance.value.filter(
        record =>
          record.studentId === student.id
      )


    const present =
      records.filter(
        record =>
          record.status === 'Present'
      ).length


    const absent =
      records.filter(
        record =>
          record.status === 'Absent'
      ).length


    const late =
      records.filter(
        record =>
          record.status === 'Late'
      ).length


    const total =
      records.length


    const rate =
      total > 0
        ? Math.round(
            (
              (present + late)
              /
              total
            ) * 100
          )
        : 0


    return {
      id: student.id,
      name: student.name,
      course: student.course,
      total,
      present,
      absent,
      late,
      rate
    }

  })

})


// ======================================
// LOAD SETTINGS
// ======================================

const loadSettings = () => {

  const savedSystemName =
    localStorage.getItem('systemName')

  const savedSchoolName =
    localStorage.getItem('schoolName')

  const savedAdminName =
    localStorage.getItem('adminName')

  const savedDarkMode =
    localStorage.getItem('darkMode')


  if (savedSystemName) {
    systemName.value =
      savedSystemName
  }


  if (savedSchoolName) {
    schoolName.value =
      savedSchoolName
  }


  if (savedAdminName) {
    adminName.value =
      savedAdminName
  }


  if (savedDarkMode !== null) {

    darkMode.value =
      savedDarkMode === 'true'

  }

}


// ======================================
// APPLY DARK MODE
// ======================================

const applyDarkMode = () => {

  document.documentElement.classList.toggle(
    'dark',
    darkMode.value
  )

}


// ======================================
// TOGGLE DARK MODE
// ======================================

const toggleDarkMode = () => {

  darkMode.value =
    !darkMode.value

  localStorage.setItem(
    'darkMode',
    darkMode.value
  )

  applyDarkMode()

}


// ======================================
// SAVE SETTINGS
// ======================================

const saveSettings = () => {

  localStorage.setItem(
    'systemName',
    systemName.value
  )

  localStorage.setItem(
    'schoolName',
    schoolName.value
  )

  localStorage.setItem(
    'adminName',
    adminName.value
  )

  localStorage.setItem(
    'darkMode',
    darkMode.value
  )

  applyDarkMode()

  alert(
    'Settings saved successfully!'
  )

}


// ======================================
// START
// ======================================

onMounted(() => {

  syncPageFromHash()
  window.addEventListener('hashchange', syncPageFromHash)

  loadSettings()

  if (currentUser.value?.name) {
    adminName.value = currentUser.value.name
  }

  applyDarkMode()

})

const handleAuthenticated = () => {
  if (currentUser.value?.name) adminName.value = currentUser.value.name
}

const handleLogout = () => {
  logout()
  activePage.value = 'dashboard'
}

onUnmounted(() => {
  window.removeEventListener('hashchange', syncPageFromHash)
})

</script>


<template>

  <AuthGate
    v-if="!isAuthenticated"
    @authenticated="handleAuthenticated"
  />

  <div
    v-else
    :class="
      darkMode
        ? 'bg-slate-950 text-white'
        : 'bg-slate-100 text-slate-900'
    "
    class="min-h-screen flex transition-colors duration-300"
  >


    <!-- ================================= -->
    <!-- SIDEBAR -->
    <!-- ================================= -->

    <Sidebar
      :active-page="activePage"
      :school-name="schoolName"
      :admin-name="adminName"
      @navigate="changePage"
    />


    <!-- ================================= -->
    <!-- MAIN AREA -->
    <!-- ================================= -->

    <div class="flex-1 min-w-0">

      <Topbar
        :system-name="systemName"
        :school-name="schoolName"
        :admin-name="adminName"
        @navigate="changePage"
        @logout="handleLogout"
      />


      <!-- ================================= -->
      <!-- CONTENT -->
      <!-- ================================= -->

      <main
        :class="
          darkMode
            ? 'bg-slate-950'
            : 'bg-slate-100'
        "
        class="p-6 min-h-[calc(100vh-64px)] transition-colors duration-300"
      >


        <!-- ================================= -->
        <!-- DASHBOARD -->
        <!-- ================================= -->

        <Dashboard
          v-if="
            activePage === 'dashboard'
          "

          :total-students="
            students.length
          "

          :present-today="
            presentToday
          "

          :late-today="
            lateToday
          "

          :absent-today="
            absentToday
          "

          @navigate="changePage"
        />


        <!-- ================================= -->
        <!-- STUDENTS -->
        <!-- ================================= -->

        <Students
          v-else-if="
            activePage === 'students'
          "
        />


        <!-- ================================= -->
        <!-- ATTENDANCE -->
        <!-- ================================= -->

        <Attendance
          v-else-if="
            activePage === 'attendance'
          "
        />


        <!-- ================================= -->
        <!-- REPORTS -->
        <!-- ================================= -->

        <div
          v-else-if="
            activePage === 'reports'
          "
          class="space-y-6"
        >

          <div>

            <h1 class="text-2xl font-bold">
              Attendance Reports
            </h1>

            <p class="text-slate-500 mt-1">
              View student attendance performance.
            </p>

          </div>


          <!-- REPORT CARDS -->

          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >

            <div
              class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"
            >

              <p class="text-sm text-slate-500">
                Today's Records
              </p>

              <p class="text-2xl font-bold mt-2">
                {{ todayAttendance.length }}
              </p>

            </div>


            <div
              class="bg-white rounded-2xl border border-green-200 p-5 shadow-sm"
            >

              <p class="text-sm text-green-600">
                Present
              </p>

              <p
                class="text-2xl font-bold text-green-700 mt-2"
              >
                {{ presentToday }}
              </p>

            </div>


            <div
              class="bg-white rounded-2xl border border-yellow-200 p-5 shadow-sm"
            >

              <p class="text-sm text-yellow-600">
                Late
              </p>

              <p
                class="text-2xl font-bold text-yellow-700 mt-2"
              >
                {{ lateToday }}
              </p>

            </div>


            <div
              class="bg-white rounded-2xl border border-red-200 p-5 shadow-sm"
            >

              <p class="text-sm text-red-600">
                Absent
              </p>

              <p
                class="text-2xl font-bold text-red-700 mt-2"
              >
                {{ absentToday }}
              </p>

            </div>

          </div>


          <!-- ATTENDANCE RATE -->

          <div
            class="bg-white rounded-2xl border border-blue-200 p-6 shadow-sm"
          >

            <div
              class="flex items-center justify-between mb-4"
            >

              <div>

                <h2 class="text-lg font-bold">
                  Today's Attendance Rate
                </h2>

                <p class="text-sm text-slate-500">
                  Present and late students are considered attended.
                </p>

              </div>


              <span
                class="text-2xl font-bold text-blue-600"
              >
                {{ todayAttendanceRate }}%
              </span>

            </div>


            <div
              class="w-full h-3 bg-slate-100 rounded-full overflow-hidden"
            >

              <div
                class="h-full bg-blue-600 rounded-full transition-all duration-500"
                :style="{
                  width:
                    Math.min(
                      todayAttendanceRate,
                      100
                    ) + '%'
                }"
              ></div>

            </div>

          </div>


          <!-- STUDENT REPORT -->

          <div
            class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
          >

            <div
              class="px-6 py-5 border-b border-slate-200"
            >

              <h2 class="font-bold">
                Student Attendance Report
              </h2>

              <p class="text-sm text-slate-500 mt-1">
                Overall attendance performance.
              </p>

            </div>


            <div class="overflow-x-auto">

              <table class="w-full">

                <thead>

                  <tr
                    class="bg-slate-50 text-left"
                  >

                    <th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                      Student
                    </th>

                    <th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                      Course
                    </th>

                    <th class="px-6 py-4 text-xs font-semibold text-slate-500 uppercase">
                      Total
                    </th>

                    <th class="px-6 py-4 text-xs font-semibold text-green-600 uppercase">
                      Present
                    </th>

                    <th class="px-6 py-4 text-xs font-semibold text-red-600 uppercase">
                      Absent
                    </th>

                    <th class="px-6 py-4 text-xs font-semibold text-yellow-600 uppercase">
                      Late
                    </th>

                    <th class="px-6 py-4 text-xs font-semibold text-blue-600 uppercase">
                      Rate
                    </th>

                  </tr>

                </thead>


                <tbody
                  class="divide-y divide-slate-100"
                >

                  <tr
                    v-for="
                      student in reportData
                    "
                    :key="student.id"
                    class="hover:bg-slate-50"
                  >

                    <td
                      class="px-6 py-4 font-semibold"
                    >
                      {{ student.name }}
                    </td>

                    <td class="px-6 py-4">
                      {{ student.course }}
                    </td>

                    <td class="px-6 py-4">
                      {{ student.total }}
                    </td>

                    <td
                      class="px-6 py-4 text-green-600"
                    >
                      {{ student.present }}
                    </td>

                    <td
                      class="px-6 py-4 text-red-600"
                    >
                      {{ student.absent }}
                    </td>

                    <td
                      class="px-6 py-4 text-yellow-600"
                    >
                      {{ student.late }}
                    </td>

                    <td
                      class="px-6 py-4 text-blue-600 font-semibold"
                    >
                      {{ student.rate }}%
                    </td>

                  </tr>


                  <tr
                    v-if="
                      reportData.length === 0
                    "
                  >

                    <td
                      colspan="7"
                      class="px-6 py-12 text-center text-slate-500"
                    >
                      No student records found.
                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

          </div>

        </div>


        <!-- ================================= -->
        <!-- SETTINGS -->
        <!-- ================================= -->

        <div
          v-else-if="
            activePage === 'settings'
          "
          class="space-y-6"
        >

          <div>

            <h1 class="text-2xl font-bold">
              Settings
            </h1>

            <p class="text-slate-500 mt-1">
              Manage your system preferences.
            </p>

          </div>


          <div
            class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"
          >

            <h2 class="text-lg font-bold">
              System Information
            </h2>

            <p
              class="text-sm text-slate-500 mt-1 mb-6"
            >
              Customize your system information.
            </p>


            <div class="space-y-5">


              <!-- SYSTEM NAME -->

              <div>

                <label
                  class="block text-sm font-semibold mb-2"
                >
                  System Name
                </label>

                <input
                  v-model="systemName"
                  type="text"
                  class="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>


              <!-- COURSE -->

              <div>

                <label
                  class="block text-sm font-semibold mb-2"
                >
                  Course / Section
                </label>

                <input
                  v-model="schoolName"
                  type="text"
                  class="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>


              <!-- ADMIN -->

              <div>

                <label
                  class="block text-sm font-semibold mb-2"
                >
                  Administrator Name
                </label>

                <input
                  v-model="adminName"
                  type="text"
                  class="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />

              </div>


              <!-- DARK MODE -->

              <div
                class="flex items-center justify-between border border-slate-200 rounded-xl p-4"
              >

                <div>

                  <p class="font-semibold">
                    Dark Mode
                  </p>

                  <p class="text-sm text-slate-500">
                    Change system appearance.
                  </p>

                </div>


                <button
                  @click="toggleDarkMode"
                  class="px-4 py-2 rounded-xl font-semibold transition"
                  :class="
                    darkMode
                      ? 'bg-slate-800 text-white'
                      : 'bg-slate-100 text-slate-700'
                  "
                >

                  {{
                    darkMode
                      ? 'Enabled'
                      : 'Disabled'
                  }}

                </button>

              </div>


              <!-- SAVE -->

              <button
                @click="saveSettings"
                class="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Save Settings
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>

  </div>

</template>
