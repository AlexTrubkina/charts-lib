import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    dts(),
    tsconfigPaths()
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ChartsLibReact',
      fileName: 'index',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@charts-lib/renderer'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@charts-lib/renderer': 'charts-lib-renderer'
        }
      }
    }
  },
  // Important for path resolution:
  resolve: {
    preserveSymlinks: true
  }
})
