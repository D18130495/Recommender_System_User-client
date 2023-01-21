<template>
  <div>
    <ul class="separator flex flex-row gap-6 text-white">
      <li>Home</li>
      <li :to="{ path: '/' }">Profile</li>
    </ul>

    <div class="flex flex-col">
      <div class="profile-header">
        <h1 class="profile-title text-white uppercase">
          Profile
        </h1>
      </div>

      <div class="main-grid">
        <div class="relative">
          <ProfileDetail />
          <ProfileFavouriteItem />
        </div>

        <div class="col-span-1">
          <Sidebar>
            <SidebarProfile />
          </Sidebar>
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


export default defineComponent({
  name: 'Profile',
  components: {
    ProfileDetail, ProfileFavouriteItem, Sidebar, SidebarProfile
  },
  setup() {
    return {
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
