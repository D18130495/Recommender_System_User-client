import { defineStore } from 'pinia'
import cookies from 'js-cookie'
import nProgress, {start} from 'nprogress'
import 'nprogress/nprogress.css'

nProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
  parent: '#loading-bar-wrapper'
})

const setTheme = (theme: string) => {
  if(theme === 'theme-dark') {
    document.body.classList.remove('theme-light')
    document.body.classList.add('theme-dark')
  }else {
    document.body.classList.remove('theme-dark')
    document.body.classList.add('theme-light')
  }
}

const scrollTop = (scroll: boolean) => {
  if(!scroll) {
    const timer = setInterval(function () {
      const sTop = window.scrollY;
      const offset = sTop - (sTop * 0.1 + 10);

      if(offset > 0) {
        window.scrollTo(0, offset);
      } else {
        window.scrollTo(0, 0);
        clearInterval(timer);
      }
    }, 25);
  }
}

export const useAppStore = defineStore('appStore', {
  state: () => {
    return {
      themeConfig: {
        theme: cookies.get('theme') ? String(cookies.get('theme')) : 'theme-dark',
        profile_shape: 'circle-avatar',
        feature: true,
        text: {
          navy_blue: '#5433ff',
          pink: '#ff0099',
          cyan: '#24c6dc',
          purple: '#e085e0',
        },
        header_gradient_dark: 'linear-gradient(130deg, #24c6dc, #5433ff 41.07%, #ff0099 76.05%)',
        header_gradient_light: 'linear-gradient(130deg, rgb(255, 102, 204), rgb(102, 255, 204) 41.07%, rgb(102, 204, 255) 76.05%)'
      },
      appLoading: false,
      scrollTop: false,
      websiteConfig: '' as any,
      movieCount: 0,
      bookCount: 0,
      NPTimeout: -1,
      loadingTimeout: -1
    }
  },
  actions: {
    initializeTheme(theme: string) {
      setTheme(theme)
    },
    switchTheme(darkTheme?: boolean) {
      this.themeConfig.theme = darkTheme === true || this.themeConfig.theme === 'theme-light' ? 'theme-dark' : 'theme-light'
      cookies.set('theme', this.themeConfig.theme, { expires: 7 })
      setTheme(this.themeConfig.theme)
    },
    startLoading() {
      if(this.appLoading === true) return
      if(this.NPTimeout !== -1) clearTimeout(this.NPTimeout)
      if(this.loadingTimeout !== -1) clearTimeout(this.loadingTimeout)
      nProgress.start()
      this.appLoading = true
    },
    endLoading() {
      this.NPTimeout = <any>setTimeout(() => {
        nProgress.done()
        scrollTop(this.scrollTop)
      }, 100)

      this.loadingTimeout = <any>setTimeout(() => {
        this.appLoading = false
        scrollTop(this.scrollTop)
      }, 300)
    }
  }
})
