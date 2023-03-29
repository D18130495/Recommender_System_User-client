<template>
  <div id="footer" class="relative w-full pt-1" :style="gradientBackground">
    <span class="bg-ob-deep-900 flex justify-center">
      <div class="bg-ob-deep-900 rounded-lg max-w-10/12 lg:max-w-screen-2xl text-sm text-ob-normal w-full py-6 px-6 grid grid-rows-1 lg:grid-rows-none lg:grid-cols-4 justify-center items-center gap-8 h-36 mx-auto">
        <div class="flex flex-col lg:flex-row gap-6 lg:gap-12 row-span-1 lg:col-span-5 text-center lg:text-left mx-auto">
          <ul class="flex flex-col gap-1.5 mx-auto">
            <li class="text-ob-bright">
              Copyright © {{ currentYear }}
              <b class="font-extrabold">{{ websiteConfig.author }}</b>
              <a href='https://github.com/D18130495/Recommender_System_User-client' target="_blank"> Github </a>
              <b>|</b>
              <a @click="toPrivacy()" style="color: #5799ef; cursor: pointer"> Privacy Policy </a>
              <b>|</b>
              <a @click="toService()" style="color: #5799ef; cursor: pointer"> Terms of Service</a>
            </li>
          </ul>
        </div>
      </div>
    </span>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"

import { useAppStore } from "@/stores/app"
import { useRouter } from "vue-router"


export default defineComponent({
  name: 'Footer',
  setup() {
    const appStore = useAppStore()
    const router = useRouter()

    const toPrivacy = () => {
      router.push({ path: '/privacy' })
    }

    const toService = () => {
      router.push({ path: '/service' })
    }

    return {
      toPrivacy,
      toService,
      gradientBackground: computed(() => {
        if(appStore.themeConfig.theme === 'theme-dark') {
          return {
            background: appStore.themeConfig.header_gradient_dark,
          }
        }else {
          return {
            background: appStore.themeConfig.header_gradient_light,
          }
        }
      }),
      currentYear: computed(() => new Date().getUTCFullYear()),
      websiteConfig: computed(() => appStore.websiteConfig)
    }
  }
})
</script>
