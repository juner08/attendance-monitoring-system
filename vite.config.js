import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  base: '/attendance-monitoring-system/',
  plugins: [vue(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    clearMocks: true
  }
})
