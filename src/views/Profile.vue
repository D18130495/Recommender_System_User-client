<template>
  <div>
    <title>Profile</title>
    <ul class="separator flex flex-row gap-6 text-white">
      <li @click="toHome()" style="cursor: pointer">Home</li>
      <li>Profile</li>
    </ul>

    <div class="flex flex-col">
      <div class="profile-header">
        <h1 class="profile-title text-white uppercase">
          Profile
        </h1>
      </div>

      <div class="main-grid">
        <div class="relative">
          <ProfileDetail v-if="userStore.userInfo !== ''" />
          <ProfileFavouriteItem v-if="userStore.userInfo !== ''" />
        </div>

        <div class="col-span-1">
          <el-affix :offset="20">
            <Sidebar>
              <SidebarProfile v-if="userStore.userInfo !== ''" />
            </Sidebar>
          </el-affix>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import ProfileDetail from "@/components/Profile/ProfileDetail.vue"
import ProfileFavouriteItem from "@/components/Profile/ProfileFavouriteItem.vue"
import Sidebar from "@/components/Sidebar/Sidebar.vue"
import SidebarProfile from "@/components/Sidebar/SidebarProfile.vue"

import { useUserStore } from "@/stores/user"
import {useRouter} from "vue-router";


export default defineComponent({
  name: 'Profile',
  components: {
    ProfileDetail, ProfileFavouriteItem, Sidebar, SidebarProfile
  },
  setup() {
    const userStore = useUserStore()
    const router = useRouter()

    const toHome = () => {
      router.push({ path: '/' })
    }

    return {
      userStore,
      toHome
    }
  }
})
</script>

<style lang="scss" scoped>
.separator {
  position: relative;
  z-index: 20;
  li {
    position: relative;
    z-index: 20;
    &:after {
      content: '>';
      position: absolute;
      right: -1.1rem;
      opacity: 0.65;
    }
    &:last-of-type {
      &:after {
        content: '';
      }
    }
  }
}
</style>
