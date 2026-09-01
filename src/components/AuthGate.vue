<script setup>
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth'

const emit = defineEmits(['authenticated'])
const { login, register } = useAuth()
const mode = ref('login')
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const message = ref('')
const loading = ref(false)

const submit = async () => {
  message.value = ''
  if (mode.value === 'register' && password.value !== confirmPassword.value) {
    message.value = 'Passwords do not match.'
    return
  }
  loading.value = true
  const result = mode.value === 'login'
    ? await login({ email: email.value, password: password.value })
    : await register({ name: name.value, email: email.value, password: password.value })
  loading.value = false
  if (result.success) emit('authenticated')
  else message.value = result.message
}
</script>

<template>
  <main class="min-h-screen bg-slate-100 flex items-center justify-center p-5">
    <form @submit.prevent="submit" class="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-7 shadow-sm space-y-5">
      <div>
        <p class="text-sm font-semibold text-blue-600">Attendance Monitoring System</p>
        <h1 class="text-2xl font-bold text-slate-900 mt-1">{{ mode === 'login' ? 'Welcome back' : 'Create administrator account' }}</h1>
        <p class="text-sm text-slate-500 mt-2">{{ mode === 'login' ? 'Sign in to access student and attendance records.' : 'Your password is hashed before it is saved in this browser.' }}</p>
      </div>
      <div v-if="mode === 'register'">
        <label class="block text-sm font-semibold text-slate-700 mb-2">Full name</label>
        <input v-model="name" required autocomplete="name" class="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Administrator name">
      </div>
      <div>
        <label class="block text-sm font-semibold text-slate-700 mb-2">Email</label>
        <input v-model="email" required type="email" autocomplete="email" class="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="admin@example.com">
      </div>
      <div>
        <label class="block text-sm font-semibold text-slate-700 mb-2">Password</label>
        <input v-model="password" required type="password" :minlength="mode === 'register' ? 8 : undefined" autocomplete="current-password" class="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••">
      </div>
      <div v-if="mode === 'register'">
        <label class="block text-sm font-semibold text-slate-700 mb-2">Confirm password</label>
        <input v-model="confirmPassword" required type="password" minlength="8" autocomplete="new-password" class="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500" placeholder="••••••••">
      </div>
      <p v-if="message" class="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">{{ message }}</p>
      <button :disabled="loading" class="w-full bg-blue-600 disabled:bg-blue-400 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 transition">{{ loading ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Register' }}</button>
      <p class="text-center text-sm text-slate-600">{{ mode === 'login' ? 'No account yet?' : 'Already registered?' }} <button type="button" @click="mode = mode === 'login' ? 'register' : 'login'; message = ''" class="font-semibold text-blue-600">{{ mode === 'login' ? 'Register' : 'Log in' }}</button></p>
    </form>
  </main>
</template>
