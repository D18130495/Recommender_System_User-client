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
  },
  {
    path: '/book/:isbn',
    name: 'Book',
    component: () => import('../views/Book.vue'),
    meta: {
      book: true
    }
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('../views/Privacy.vue'),
    meta: {
      privacy: true
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

  if((location.pathname + location.search) == from.fullPath) { // browser back, do not scroll to top
    appStore.scrollTop = false
  }else { // to new page, scroll to top
    appStore.scrollTop = true
  }

  // front cookie expired, server token not expired
  if(cookies.get('token') !== undefined) {
    if(to.path === '/authentication') { // already logged in
      next('/')
    }else if(from.path === '/authentication') { // login do not load bar
      next()
    }else {
      appStore.startLoading()
      next()
    }
  }else {
    if(to.path === '/profile') {
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
      if(to.path === '/authentication') { // to authentication do not load bar
        next()
      }else if(from.path === '/authentication') { // from authentication do not load bar
        next()
      }else {
        appStore.startLoading()
        next()
      }
    }
  }
})

router.afterEach((to, from, next) => {
  const appStore = useAppStore()

  if(router.currentRoute.value.fullPath !== '/authentication') { // path not authentication end load bar
    appStore.endLoading()
  }
})

export default router
