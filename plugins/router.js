export default ({ app, store, $axios }) => {
  app.router.beforeEach((to, from, next) => {
    if(to.path  === '/login' || to.path  === '/signup') {
      next('/map')
    }else {
      next()
    }
    // if(token.get()) {
    //   if(to.path  === '/login' || to.path  === '/signup') {
    //     next('/map')
    //   }else {
    //     next()
    //   }
    // }else {
    //   if(to.path === '/' || to.path  === '/login' || to.path  === '/signup') {
    //     next()
    //   }else {
    //     next('/')
    //   }
    // }
  })
}
