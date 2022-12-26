import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Authentication from '../views/Authentication.vue'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/authentication',
    name: 'Authentication',
    component: Authentication,
    meta: {
      authentication: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
