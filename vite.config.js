import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import  {NodeGlobalsPolyfillPlugin} from 'vite-plugin-node-polyfills'


export default defineConfig({
  base: '/Portfolio/', 
  plugins: [
    vue(),
    ],
})