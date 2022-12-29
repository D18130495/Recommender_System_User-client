import { createApp } from 'vue'
import App from './App.vue'

import router from './router/index'
// import './router/guard'
import '@/styles/index.scss'
import 'normalize.css/normalize.css'
import { createPinia } from 'pinia'
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

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// import infiniteScroll from 'vue3-infinite-scroll-better'
import v3ImgPreview from 'v3-img-preview'
// import api from './api/api'

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
    loading: require('@/assets/default-cover.jpg'),
    error: require('@/assets/default-cover.jpg')
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
