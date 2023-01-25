import { createApp } from 'vue'
import App from './App.vue'

// router
import router from './router/index'
// import './router/guard'

// style
import '@/styles/index.scss'
import 'normalize.css/normalize.css'

// status store
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// click away from component
import VueClickAway from 'vue3-click-away'
import lazyPlugin from 'vue3-lazy'


// import { registerObSkeleton } from '@/components/LoadingSkeleton'
import 'prismjs/themes/prism.css'
import 'prismjs'
import 'element-plus/theme-chalk/index.css'

// import { components, plugins } from '@/plugins/element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


// import infiniteScroll from 'vue3-infinite-scroll-better'
import v3ImgPreview from 'v3-img-preview'

// google authentication
import vue3GoogleLogin from 'vue3-google-login'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export const app = createApp(App)
  .use(router)
  .use(pinia)
  .use(ElementPlus)
  .use(VueClickAway)
  // .use(infiniteScroll)
  .use(v3ImgPreview, {})
  .use(lazyPlugin, {
    loading: require('@/assets/posterNotFound.jpg'),
    error: require('@/assets/posterNotFound.jpg')
  })
  .use(vue3GoogleLogin, {
    clientId: '432310000568-j3mdir2aonnjluvs8f72o9spe6k3mvlm.apps.googleusercontent.com'
  })

// icon
for(const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// components.forEach((component) => {
//   app.component(component.name, component)
// })
//
// plugins.forEach((plugin) => {
//   app.use(plugin)
// })

// registerObSkeleton(app)
app.mount('#app')

console.log('%c Web creator: Yushun Zeng', 'color:#bada55')
console.log('%c gmail: 990415zys@gmail.com', 'color:#bada55')

// api.report()
