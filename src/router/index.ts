import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

import { ElMessageBox } from 'element-plus'

import {useUserStore} from "@/stores/user";

import cookies from "js-cookie"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      home: true
    }
  },
  {
    path: '/authentication',
    name: 'Authentication',
    component: () => import('../views/Authentication.vue'),
    meta: {
      authentication: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      profile: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if(cookies.get('token') !== undefined) {
    // if(to.path  === '/login' || to.path  === '/signup') {
    //   next('/map')
    // }else {
    //   next()
    // }
    next()
  }else {
    if(to.path === '/' || to.path  === '/authentication') {
      next()
    }else {
      ElMessageBox.confirm(
          'You have been logged out, you can cancel to stay on this page, or log in again',
          'Confirm logout',
          {
            confirmButtonText: 'Login',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }
      ).then(() => {
        userStore.userInfo = ''
        userStore.token = ''
        sessionStorage.removeItem('token')

        router.push({ path: '/authentication' })
      }).catch(() => {
        location.reload()
      })
    }
  }
})

export default router
