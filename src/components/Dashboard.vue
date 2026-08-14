<script setup>
import StatCard from './StatCard.vue'

defineProps({
  totalStudents: {
    type: Number,
    default: 0
  },

  presentToday: {
    type: Number,
    default: 0
  },

  lateToday: {
    type: Number,
    default: 0
  },

  absentToday: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['navigate'])

const goToAttendance = () => {
  emit('navigate', 'attendance')
}

const goToStudents = () => {
  emit('navigate', 'students')
}

const goToReports = () => {
  emit('navigate', 'reports')
}
</script>

<template>
  <div class="space-y-6">

    <!-- Welcome -->
    <div class="dashboard-hero overflow-hidden relative rounded-3xl px-6 py-8 sm:px-9 sm:py-10">
      <div class="relative z-10">
      <p class="text-sm font-semibold uppercase tracking-[0.18em] text-blue-100/80">Daily overview</p>
      <h1 class="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-white">
        Good morning, Administrator 👋
      </h1>

      <p class="text-blue-100 mt-3 max-w-xl">
        Stay on top of class participation with a clear view of today’s attendance.
      </p>
      </div>
      <div class="dashboard-hero__orb dashboard-hero__orb--one"></div>
      <div class="dashboard-hero__orb dashboard-hero__orb--two"></div>
    </div>

    <!-- Statistics -->
    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

      <StatCard
        title="Total Students"
        :value="totalStudents"
        icon="👨‍🎓"
        description="Registered students"
        tone="blue"
      />

      <StatCard
        title="Present Today"
        :value="presentToday"
        icon="✓"
        description="Students present"
        tone="green"
      />

      <StatCard
        title="Late Today"
        :value="lateToday"
        icon="⏰"
        description="Students arrived late"
        tone="amber"
      />

      <StatCard
        title="Absent Today"
        :value="absentToday"
        icon="✕"
        description="Students absent"
        tone="red"
      />

    </div>

    <!-- Attendance Rate -->
    <div
      class="dashboard-panel bg-white rounded-3xl border border-slate-200 p-6 shadow-sm"
    >

      <div class="flex items-center justify-between mb-4">

        <div>
          <h2 class="text-lg font-bold text-slate-900">
            Today's Attendance Rate
          </h2>

          <p class="text-sm text-slate-500">
            Overall student attendance for today
          </p>
        </div>

        <span class="text-2xl font-bold text-blue-600">
          {{
            totalStudents > 0
              ? Math.round(
                  ((presentToday + lateToday) / totalStudents) * 100
                )
              : 0
          }}%
        </span>

      </div>

      <div class="w-full h-3 bg-slate-100 rounded-full overflow-hidden">

        <div
          class="h-full bg-blue-600 rounded-full transition-all duration-500"
          :style="{
            width:
              totalStudents > 0
                ? Math.min(
                    ((presentToday + lateToday) / totalStudents) * 100,
                    100
                  ) + '%'
                : '0%'
          }"
        ></div>

      </div>

    </div>

    <!-- Quick Actions -->
    <div
      class="dashboard-panel bg-white rounded-3xl border border-slate-200 p-6 shadow-sm"
    >

      <h2 class="text-lg font-bold text-slate-900">
        Quick Actions
      </h2>

      <p class="text-sm text-slate-500 mt-1 mb-4">
        Frequently used attendance functions
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <!-- Record Attendance -->
        <button
          @click="goToAttendance"
          class="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition text-left"
        >
          <div class="text-2xl mb-2">
            📋
          </div>

          <p class="font-semibold text-slate-800">
            Record Attendance
          </p>

          <p class="text-xs text-slate-500 mt-1">
            Add a new attendance record
          </p>
        </button>

        <!-- Manage Students -->
        <button
          @click="goToStudents"
          class="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition text-left"
        >
          <div class="text-2xl mb-2">
            👨‍🎓
          </div>

          <p class="font-semibold text-slate-800">
            Manage Students
          </p>

          <p class="text-xs text-slate-500 mt-1">
            View and manage students
          </p>
        </button>

        <!-- View Reports -->
        <button
          @click="goToReports"
          class="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition text-left"
        >
          <div class="text-2xl mb-2">
            📊
          </div>

          <p class="font-semibold text-slate-800">
            View Reports
          </p>

          <p class="text-xs text-slate-500 mt-1">
            Check attendance reports
          </p>
        </button>

      </div>

    </div>

  </div>
</template>
