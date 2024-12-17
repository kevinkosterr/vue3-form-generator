import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts()
  ],
  build: {
    minify: 'terser',
    lib: {
      entry: 'src/index.ts',
      name: 'vue3-form-generator',
      fileName: (format) => `vue3-form-generator.${format}.js`
    },
    rollupOptions: {
      external: [ 'vue', new RegExp('/themes/.*') ],
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
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@test': fileURLToPath(new URL('./__tests__', import.meta.url))
    }
  }
})
