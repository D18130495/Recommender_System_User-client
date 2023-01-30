<template>
  <div v-if="!$route.meta.authentication">
    <div id="App-Wrapper" :class="[appWrapperClass, theme]" :style="wrapperStyle">
      <div
        id="App-Container"
        class="app-container max-w-10/12 lg:max-w-screen-2xl px-3 lg:px-8"
        tabindex="-1"
        :style="themeSetting">
        <Header v-if="isRouterAlive"/>
        <img class="app-banner app-banner-image" :style="headerImage"/>
        <div class="app-banner app-banner-screen" :style="headerBaseBackground"/>
        <div class="relative z-10">
          <router-view v-if="isRouterAlive" v-slot="{ Component }">
            <transition name="fade-slide-y" mode="out-in">
              <component :is="Component"/>
            </transition>
          </router-view>
        </div>
      </div>
      <div id="loading-bar-wrapper" :class="loadingBarClass"></div>
    </div>
    <Footer id="footer" :class="[theme]" :style="themeSetting"/>

    <!-- GDPR -->
    <el-drawer v-model="userStore.drawer" direction="btt" :with-header="false" size="">
      <template #default>
        <h4 class="text-xl mb-3">We value your privacy</h4>

        <div class="inline-flex w-full">
          <p class="text-left">
            We use cookies to enhance your browsing experience, and GDPR to protect your data for recommendation purpose.
          </p>

          <div class="ml-auto">
            <el-button @click="cancelClick">cancel</el-button>
            <el-button type="primary" @click="confirmClick">confirm</el-button>
          </div>
        </div>
      </template>
    </el-drawer>
  </div>

  <div v-else-if="$route.meta.authentication">
    <router-view v-slot="{ Component }">
      <transition name="fade-slide-y" mode="out-in">
        <component :is="Component"/>
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, nextTick, onBeforeMount, ref, provide, watch} from 'vue'

import { ElNotification } from "element-plus/es"

import { useAppStore } from "@/stores/app"
import { useUserStore } from "@/stores/user"
import { useHeaderImageStore } from "@/stores/headerImage"

import cookies from "js-cookie"

import Header from "@/components/Header/Header.vue"
import Footer from "@/components/Footer/Footer.vue"

import userApi from "@/api/user"


export default defineComponent({
  name: 'App',
  components: {
    Header, Footer
  },
  setup() {
    const appStore = useAppStore()
    const userStore = useUserStore()
    const commonStore = useHeaderImageStore()

    const isRouterAlive = ref(true)

    const appWrapperClass = 'app-wrapper'
    const wrapperStyle = ref({ 'min-height': '100vh' })

    let seconds = 3600
    let expires = new Date(new Date().getTime() + seconds * 1000)

    const loadingBarClass = ref({
      'nprogress-custom-parent': false
    })

    // before page loaded
    onBeforeMount(() => {
      initialApp()
    })

    const reload = () => {
      isRouterAlive.value = false

      nextTick(() => {
        isRouterAlive.value = true
      })
    }

    provide("reload", reload)

    // initial app
    const initialApp = () => {
      initialPage()
      initialUser()
      initialTheme()
      initialGDPR()
      fetchWebsiteConfig()
    }

    // initial page height
    const initialPage = () => {
      let wrapperHeight = innerHeight
      const footerHeight = document.getElementById('footer')?.getBoundingClientRect().height

      if(typeof footerHeight === 'number') {
        wrapperHeight = wrapperHeight - footerHeight * 2
      }

      wrapperStyle.value = {
        'min-height': wrapperHeight + 'px'
      }
    }

    // initial page theme
    const initialTheme = () => {
      appStore.initializeTheme(appStore.themeConfig.theme)
    }

    // initial page theme
    const initialUser = () => {
      if(cookies.get('token') !== undefined) {
        userApi.tokenLoginRefresh(String(cookies.get('token')))
          .then((response) => {
            userStore.userInfo = response.data.data
            userStore.token = response.data.data.token
            sessionStorage.setItem('token', response.data.data.token)
            cookies.set('token', response.data.data.token, { expires: expires })
          })
      }else {
        userStore.userInfo = ''
        userStore.token = ''
        sessionStorage.removeItem('token')
      }
    }

    // initial GDPR
    const initialGDPR = () => {
      if(cookies.get('token') !== undefined) {
        if(userStore.userInfo.policy === "U") {
          userStore.drawer = true
        }
      }
    }

    const cancelClick = () => {
      userApi.updateUserDetail({"email": userStore.userInfo.email, "policy": false})
          .then((response) => {
            userStore.userInfo.policy = "F"
            userStore.drawer = false

            ElNotification({
              title: 'Reject',
              message: 'You can change this setting later in the profile',
              type: 'warning',
              duration: 1500
            })
          })
    }

    const confirmClick = () => {
      userApi.updateUserDetail({"email": userStore.userInfo.email, "policy": true})
          .then((response) => {
            userStore.userInfo.policy = "T"
            userStore.drawer = false

            ElNotification({
              title: 'Accepted',
              message: 'Accepted',
              type: 'success',
              duration: 1500
            })
          })
    }

    const fetchWebsiteConfig = () => {
      // api.getWebsiteConfig().then(({ data }) => {
      //   appStore.viewCount = data.data.viewCount
      //   appStore.articleCount = data.data.articleCount
      //   appStore.talkCount = data.data.talkCount
      //   appStore.categoryCount = data.data.categoryCount
      //   appStore.tagCount = data.data.tagCount
      //   appStore.websiteConfig = data.data.websiteConfigDTO
      // })
      appStore.websiteConfig = {'name': 'yushun', 'englishName': 'Recommender System', 'author': 'Yushun Zeng'}
    }

    return {
      theme: computed(() => appStore.themeConfig.theme),
      headerImage: computed(() => {
        return {
          backgroundImage: `url(${commonStore.headerImage}), url(${require('@/assets/default-cover.jpg')})`,
          opacity: commonStore.headerImage !== '' ? 1 : 0
        }
      }),
      headerBaseBackground: computed(() => {
        if(appStore.themeConfig.theme === 'theme-dark') {
          return {
            background: appStore.themeConfig.header_gradient_dark,
            opacity: commonStore.headerImage !== '' ? 0.90 : 1
          }
        }else {
          return {
            background: appStore.themeConfig.header_gradient_light,
            opacity: commonStore.headerImage !== '' ? 0.90 : 1
          }
        }
      }),
      themeSetting: computed(() => {
        if(appStore.themeConfig.theme === 'theme-dark') {
          return `
            --text-accent: ${appStore.themeConfig.text.cyan};
            --text-sub-accent: ${appStore.themeConfig.text.pink};
          `
        }else {
          return `
          --text-accent: ${appStore.themeConfig.text.purple};
          --text-sub-accent: ${appStore.themeConfig.text.cyan};
        `
        }
      }),
      wrapperStyle: computed(() => wrapperStyle.value),
      isRouterAlive,
      appWrapperClass,
      loadingBarClass,
      userStore,
      cancelClick,
      confirmClick
    }
  }
})
</script>

<style lang="scss" scoped>
*:focus {
  outline: none;
}

.app-wrapper {
  @apply bg-ob-deep-900 min-w-full h-full pb-12;
  transition-property: transform, border-radius;
  transition-duration: 350ms;
  transition-timing-function: ease;
  transform-origin: 0 42%;
  .app-container {
    color: var(--text-normal);
    margin: 0 auto;
  }
}

.app-banner {
  content: '';
  display: block;
  height: 600px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  clip-path: polygon(
      100% 0,
      0% 0,
      0% 77.5%,
      1% 77.4%,
      2% 77.1%,
      3% 76.6%,
      4% 75.9%,
      5% 75.05%,
      6% 74.05%,
      7% 72.95%,
      8% 71.75%,
      9% 70.55%,
      10% 69.3%,
      11% 68.05%,
      12% 66.9%,
      13% 65.8%,
      14% 64.8%,
      15% 64%,
      16% 63.35%,
      17% 62.85%,
      18% 62.6%,
      19% 62.5%,
      20% 62.65%,
      21% 63%,
      22% 63.5%,
      23% 64.2%,
      24% 65.1%,
      25% 66.1%,
      26% 67.2%,
      27% 68.4%,
      28% 69.65%,
      29% 70.9%,
      30% 72.15%,
      31% 73.3%,
      32% 74.35%,
      33% 75.3%,
      34% 76.1%,
      35% 76.75%,
      36% 77.2%,
      37% 77.45%,
      38% 77.5%,
      39% 77.3%,
      40% 76.95%,
      41% 76.4%,
      42% 75.65%,
      43% 74.75%,
      44% 73.75%,
      45% 72.6%,
      46% 71.4%,
      47% 70.15%,
      48% 68.9%,
      49% 67.7%,
      50% 66.55%,
      51% 65.5%,
      52% 64.55%,
      53% 63.75%,
      54% 63.15%,
      55% 62.75%,
      56% 62.55%,
      57% 62.5%,
      58% 62.7%,
      59% 63.1%,
      60% 63.7%,
      61% 64.45%,
      62% 65.4%,
      63% 66.45%,
      64% 67.6%,
      65% 68.8%,
      66% 70.05%,
      67% 71.3%,
      68% 72.5%,
      69% 73.6%,
      70% 74.65%,
      71% 75.55%,
      72% 76.35%,
      73% 76.9%,
      74% 77.3%,
      75% 77.5%,
      76% 77.45%,
      77% 77.25%,
      78% 76.8%,
      79% 76.2%,
      80% 75.4%,
      81% 74.45%,
      82% 73.4%,
      83% 72.25%,
      84% 71.05%,
      85% 69.8%,
      86% 68.55%,
      87% 67.35%,
      88% 66.2%,
      89% 65.2%,
      90% 64.3%,
      91% 63.55%,
      92% 63%,
      93% 62.65%,
      94% 62.5%,
      95% 62.55%,
      96% 62.8%,
      97% 63.3%,
      98% 63.9%,
      99% 64.75%,
      100% 65.7%
  );
}

.app-banner-image {
  z-index: 1;
  background-size: cover;
  opacity: 0;
  transition: ease-in-out opacity 300ms;
}

.app-banner-screen {
  z-index: 2;
  opacity: 0.91;
  transition: ease-in-out opacity 300ms;
}

.el-button {
  width: unset;
}

/deep/ .el-drawer {
  @apply bg-ob-deep-800;

  height: unset;

  h4, div {
    @apply text-ob-bright;
  }
}
</style>
