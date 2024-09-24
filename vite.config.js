import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  build: {
    minify: 'terser',
    lib: {
      entry: 'src/index.js',
      name: 'vue3-form-generator',
      fileName: (format) => `vue3-form-generator.${format}.js`
    },
    rollupOptions: {
      external: [ 'vue' ],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
