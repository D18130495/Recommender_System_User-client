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
  // front cookie expired, server token not expired
  if(cookies.get('token') !== undefined) {
    next()
  }else {
    if(to.path === '/' || to.path  === '/authentication') {
      next()
    }else {
      next(router.currentRoute.value.fullPath)

      ElMessageBox.confirm(
          'You haven\'t logged in, or login time expired, please login',
          'Confirm login',
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
        userStore.userInfo = ''
        userStore.token = ''
        sessionStorage.removeItem('token')

        router.push({ path: '/' })
      })
    }
  }
})

export default router
