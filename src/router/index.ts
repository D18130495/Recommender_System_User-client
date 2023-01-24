import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

import { ElMessageBox } from 'element-plus'

import { useAppStore } from "@/stores/app"
import { useUserStore } from "@/stores/user"

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
  },
  {
    path: '/movie/:movieId',
    name: 'Movie',
    component: () => import('../views/Movie.vue'),
    meta: {
      movie: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const appStore = useAppStore()
  const userStore = useUserStore()

  // front cookie expired, server token not expired
  if(cookies.get('token') !== undefined) {
    appStore.startLoading()
    next()
  }else {
    if(to.path === '/123') {
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
    }else {
      appStore.startLoading()
      next()
    }
  }
})

router.afterEach(() => {
  const appStore = useAppStore()

  appStore.endLoading()
})

export default router
