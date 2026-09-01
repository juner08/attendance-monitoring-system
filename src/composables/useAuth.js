import { computed, ref } from 'vue'

const USERS_KEY = 'ams_users'
const SESSION_KEY = 'ams_session'
const currentUser = ref(null)

const getUsers = () => {
  try {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
    return Array.isArray(users) ? users : []
  } catch {
    return []
  }
}

const bytesToBase64 = (bytes) => btoa(String.fromCharCode(...bytes))

const hashPassword = async (password, salt) => {
  const passwordKey = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']
  )
  const bits = await crypto.subtle.deriveBits({
    name: 'PBKDF2',
    salt: Uint8Array.from(atob(salt), character => character.charCodeAt(0)),
    iterations: 150000,
    hash: 'SHA-256'
  }, passwordKey, 256)
  return bytesToBase64(new Uint8Array(bits))
}

const restoreSession = () => {
  try {
    const session = JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null')
    const user = getUsers().find(item => item.id === session?.userId)
    currentUser.value = user ? { id: user.id, name: user.name, email: user.email } : null
  } catch {
    currentUser.value = null
  }
}

const register = async ({ name, email, password }) => {
  const cleanName = String(name || '').trim()
  const cleanEmail = String(email || '').trim().toLowerCase()

  if (!cleanName || !cleanEmail || !password) return { success: false, message: 'Please complete all fields.' }
  if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) return { success: false, message: 'Enter a valid email address.' }
  if (password.length < 8) return { success: false, message: 'Password must be at least 8 characters.' }
  if (!window.crypto?.subtle) return { success: false, message: 'Secure password storage is not supported by this browser.' }

  const users = getUsers()
  if (users.some(user => user.email === cleanEmail)) return { success: false, message: 'An account with that email already exists.' }

  const salt = bytesToBase64(crypto.getRandomValues(new Uint8Array(16)))
  const passwordHash = await hashPassword(password, salt)
  const user = { id: crypto.randomUUID(), name: cleanName, email: cleanEmail, salt, passwordHash }
  users.push(user)
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
  return login({ email: cleanEmail, password })
}

const login = async ({ email, password }) => {
  const user = getUsers().find(item => item.email === String(email || '').trim().toLowerCase())
  if (!user || !window.crypto?.subtle) return { success: false, message: 'Invalid email or password.' }
  const passwordHash = await hashPassword(password, user.salt)
  if (passwordHash !== user.passwordHash) return { success: false, message: 'Invalid email or password.' }

  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ userId: user.id, token: crypto.randomUUID(), createdAt: Date.now() }))
  currentUser.value = { id: user.id, name: user.name, email: user.email }
  return { success: true }
}

const logout = () => {
  sessionStorage.removeItem(SESSION_KEY)
  currentUser.value = null
}

restoreSession()

export const useAuth = () => ({
  currentUser,
  isAuthenticated: computed(() => !!currentUser.value),
  register,
  login,
  logout
})
