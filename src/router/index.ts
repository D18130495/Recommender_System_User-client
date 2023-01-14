import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'


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

// router.beforeEach((to, from, next) => {
//   if(token.get()) {
//     if(to.path  === '/login' || to.path  === '/signup') {
//       next('/map')
//     }else {
//       next()
//     }
//   }else {
//     if(to.path === '/' || to.path  === '/login' || to.path  === '/signup') {
//       next()
//     }else {
//       next('/')
//     }
//   }
// })

export default router
