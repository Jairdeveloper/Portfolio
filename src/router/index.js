import { createRouter, createWebHistory } from 'vue-router'
import Blog from '../components/Blog/Blog.vue'
import Home from '../views/Home.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/blog', component: Blog }
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})