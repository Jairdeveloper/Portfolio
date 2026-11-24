import { createApp } from 'vue'
import App from './App.vue'
import Maintenance from './views/Maintenance.vue'
import router from './router'
import './assets/tailwind.css'

if (import.meta.env.VITE_MAINTENANCE_MODE === 'true') {
  createApp(Maintenance).mount('#app')
} else {
  createApp(App).use(router).mount('#app')
}
