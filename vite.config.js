import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'



export default defineConfig({
  base: '/Portfolio/', 
  plugins: [
    vue(),
    NodePolyfills({
      // Habilita polyfills para Node.js
      crypto: true,
    }),
  ],
})