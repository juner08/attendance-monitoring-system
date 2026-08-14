<script setup>
import { ref } from 'vue'

const props = defineProps({
  activePage: {
    type: String,
    default: 'dashboard'
  },
  schoolName: {
    type: String,
    default: 'BSCS 3A'
  },
  adminName: {
    type: String,
    default: 'Administrator'
  }
})

const emit = defineEmits(['navigate'])

const mobileOpen = ref(false)

const menuItems = [
  {
    name: 'dashboard',
    label: 'Dashboard',
    icon: '📊'
  },
  {
    name: 'students',
    label: 'Students',
    icon: '👨‍🎓'
  },
  {
    name: 'attendance',
    label: 'Attendance',
    icon: '📋'
  },
  {
    name: 'reports',
    label: 'Reports',
    icon: '📈'
  },
  {
    name: 'settings',
    label: 'Settings',
    icon: '⚙️'
  }
]

const navigate = (page) => {
  emit('navigate', page)
  mobileOpen.value = false
}
</script>

<template>

  <!-- Mobile Menu Button -->
  <button
    @click="mobileOpen = !mobileOpen"
    class="fixed top-4 left-4 z-50 lg:hidden w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-lg"
  >
    ☰
  </button>

  <!-- Mobile Overlay -->
  <div
    v-if="mobileOpen"
    @click="mobileOpen = false"
    class="fixed inset-0 bg-black/40 z-40 lg:hidden"
  ></div>

  <!-- Sidebar -->
  <aside
    class="fixed lg:static inset-y-0 left-0 z-40 w-64 min-h-screen bg-slate-900 text-white flex flex-col transform transition-transform duration-300"
    :class="
      mobileOpen
        ? 'translate-x-0'
        : '-translate-x-full lg:translate-x-0'
    "
  >

    <!-- Logo -->
    <div class="px-6 py-6 border-b border-slate-700">

      <div class="flex items-center gap-3">

        <div
          class="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-xl"
        >
          📋
        </div>

        <div>
          <h1 class="font-bold text-sm">
            Attendance
          </h1>

          <p class="text-xs text-slate-400">
            Monitoring System
          </p>
        </div>

      </div>

    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-4 py-6">

      <p
        class="text-xs font-semibold text-slate-500 uppercase px-3 mb-3"
      >
        Main Menu
      </p>

      <div class="space-y-2">

        <button
          v-for="item in menuItems"
          :key="item.name"
          @click="navigate(item.name)"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-left"
          :class="
            props.activePage === item.name
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
          "
        >

          <span class="text-lg">
            {{ item.icon }}
          </span>

          <span class="font-medium">
            {{ item.label }}
          </span>

        </button>

      </div>

    </nav>

    <!-- Bottom Information -->
    <div class="p-4 border-t border-slate-700">

      <div class="bg-slate-800 rounded-xl p-4">

        <p class="text-sm font-semibold">
          {{ props.schoolName }}
        </p>

        <p class="text-xs text-slate-400 mt-1">
          {{ props.adminName }}
        </p>

      </div>

    </div>

  </aside>

</template>
