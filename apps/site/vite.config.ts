import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    resolve: {
    alias: {
      '@charts': path.resolve(__dirname, '../../packages/charts-lib'),
    },
  },
})

