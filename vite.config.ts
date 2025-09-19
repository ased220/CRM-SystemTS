import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@/api': '/src/api',
      '@/types': '/src/types',
      '@/pages':'/src/pages'
    }
  }
})