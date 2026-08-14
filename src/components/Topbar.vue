<script setup>
import { ref } from 'vue'

defineProps({
  systemName: { type: String, default: 'Attendance Monitoring System' },
  schoolName: { type: String, default: 'BSCS 3A' },
  adminName: { type: String, default: 'Administrator' }
})

const emit = defineEmits(['navigate'])

const showMenu = ref(false)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const openSettings = () => {
  showMenu.value = false
  emit('navigate', 'settings')
}
</script>

<template>
  <header class="app-topbar h-20 flex items-center justify-between px-5 sm:px-8 sticky top-0 z-30">

    <!-- Left -->
    <div>
      <h2 class="font-bold text-slate-800 tracking-tight">
        {{ systemName }}
      </h2>

      <p class="text-xs text-slate-500">
        {{ schoolName }}
      </p>
    </div>

    <!-- Right -->
    <div class="relative">

      <button
        @click="toggleMenu"
        class="flex items-center gap-3 px-3 py-2 rounded-2xl hover:bg-slate-100 transition"
      >

        <!-- Avatar -->
        <div
          class="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold shadow-lg shadow-blue-500/25"
        >
          A
        </div>

        <div class="hidden sm:block text-left">

          <p class="text-sm font-semibold text-slate-800">
            {{ adminName }}
          </p>

          <p class="text-xs text-slate-500">
            Admin
          </p>

        </div>

        <span class="text-slate-400">
          ▼
        </span>

      </button>

      <!-- Dropdown -->
      <div
        v-if="showMenu"
        class="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur border border-slate-200 rounded-2xl shadow-xl p-2"
      >

        <div
          class="px-3 py-2 border-b border-slate-100 mb-1"
        >
          <p class="text-sm font-semibold text-slate-800">
            {{ adminName }}
          </p>

          <p class="text-xs text-slate-500">
            {{ schoolName }}
          </p>
        </div>

        <button
          @click="openSettings"
          class="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 text-sm text-slate-700"
        >
          Settings
        </button>

        <button
          @click="openSettings"
          class="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 text-sm text-slate-700"
        >
          Account Settings
        </button>

      </div>

    </div>

  </header>
</template>
