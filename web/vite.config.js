import path from 'node:path'
import process from 'node:process'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import eslintPlugin from 'vite-plugin-eslint';


// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
    },
  },
  optimizeDeps: {
    exclude: ['fsevents']
  },
  plugins: [
    react(),
    // eslintPlugin()
  ],
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html'),
        main: path.resolve(__dirname, 'main.html'),
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})

