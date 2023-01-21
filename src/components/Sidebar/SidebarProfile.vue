<template>
  <div class="h-96 w-full rounded-2xl relative shadow-xl mb-8" :style="gradientBackground">
    <div class="ob-gradient-cut-plate absolute bg-ob-deep-900 rounded-xl opacity-90 flex justify-center items-center pt-4 px-6 shadow-lg hover:shadow-2xl duration-300">
      <div class="profile absolute w-full flex flex-col justify-center items-center">
        <div class="flex flex-col justify-center items-center">
          <img v-if="userInfo.avatar" class="ob-avatar circle-avatar" :src="userInfo.avatar" :size="100" />
          <vue-avatar v-else class="ob-avatar circle-avatar" :username=userInfo.username :size="100" />

          <h2 v-if="userInfo.username" class="text-center pt-4 text-4xl text-ob-bright">
            {{ userInfo.username }}
          </h2>

          <span class="h-1 w-14 rounded-full mt-2" :style="gradientBackground" />

          <p v-if="userInfo.email" class="pt-6 px-10 w-full text-s text-center text-ob-secondary">
            Email: {{ userInfo.email }}
          </p>
        </div>

        <div class="h-full w-full flex flex-col flex-1 justify-end items-end">
          <ul class="grid grid-cols-3 pt-4 w-full px-2 text-lg">
            <li class="col-span-1 text-center">
              <span class="text-ob-bright">Movie</span>
              <p class="text-base text-ob-secondary">123</p>
            </li>

            <li class="col-span-1 text-center">
              <span class="text-ob-bright">Music</span>
              <p class="text-base text-ob-secondary">123</p>
            </li>

            <li class="col-span-1 text-center">
              <span class="text-ob-bright">Book</span>
              <p class="text-base text-ob-secondary">123</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRef } from 'vue'

import { useAppStore } from "@/stores/app"
import {useUserStore} from "@/stores/user"

import VueAvatar from "@webzlodimir/vue-avatar"
import "@webzlodimir/vue-avatar/dist/style.css"


export default defineComponent({
  name: 'SidebarProfile',
  components: {
    VueAvatar
  },
  setup() {
    const appStore = useAppStore()
    const userStore = useUserStore()

    return {
      userInfo: toRef(userStore.$state, 'userInfo'),
      gradientBackground: computed(() => {
        if(appStore.themeConfig.theme === 'theme-dark') {
          return {
            background: appStore.themeConfig.header_gradient_dark
          }
        }else {
          return {
            background: appStore.themeConfig.header_gradient_light
          }
        }
      })
    }
  }
})

</script>

<style lang="scss" scoped>
.profile {
  top: -7%;
  height: 100%;
  max-height: 100%;
}
</style>
