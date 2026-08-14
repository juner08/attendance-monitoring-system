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
    class="app-sidebar fixed lg:static inset-y-0 left-0 z-40 w-72 min-h-screen text-white flex flex-col transform transition-transform duration-300"
    :class="
      mobileOpen
        ? 'translate-x-0'
        : '-translate-x-full lg:translate-x-0'
    "
  >

    <!-- Logo -->
    <div class="px-6 py-7 border-b border-white/10">

      <div class="flex items-center gap-3">

        <div
          class="w-11 h-11 rounded-2xl bg-white/15 ring-1 ring-white/20 flex items-center justify-center text-xl shadow-lg"
        >
          📋
        </div>

        <div>
          <h1 class="font-bold text-sm">
            Attendance Hub
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
        class="text-[11px] font-bold tracking-[0.16em] text-blue-200/55 uppercase px-3 mb-3"
      >
        Main Menu
      </p>

      <div class="space-y-2">

        <button
          v-for="item in menuItems"
          :key="item.name"
          @click="navigate(item.name)"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 text-left"
          :class="
            props.activePage === item.name
              ? 'bg-white text-slate-900 shadow-lg shadow-blue-950/25'
              : 'text-blue-100/75 hover:bg-white/10 hover:text-white'
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
    <div class="p-5 border-t border-white/10">

      <div class="bg-white/10 rounded-2xl p-4 ring-1 ring-white/10">

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
