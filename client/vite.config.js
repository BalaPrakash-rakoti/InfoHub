// client/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // During local dev, proxy API requests to the server
      '/api': 'http://localhost:3001'
    }
  }
})
