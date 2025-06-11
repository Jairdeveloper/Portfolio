import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'



export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/Portfolio/' : '/', // Cambia según el entorno
  plugins: [
    vue(),
  ],
})