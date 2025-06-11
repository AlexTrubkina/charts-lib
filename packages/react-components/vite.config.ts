import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: [resolve(__dirname, 'src/**/*')],
      tsconfigPath: resolve(__dirname, 'tsconfig.json'),
      rollupTypes: true,
      // Critical for monorepos:
      compilerOptions: {
        preserveSymlinks: true,
        baseUrl: __dirname
      }
    })
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