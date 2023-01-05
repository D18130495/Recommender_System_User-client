<template>
  <div class="header-controls absolute top-10 right-0 flex flex-row">
    <span class="ob-drop-shadow" data-dia="search" @click="handleSearchModel">
      <el-icon size="32px"><Search/></el-icon>
    </span>
    <teleport to="body">
      <SearchModel/>
    </teleport>

    <template v-if="userInfo === ''">
      <span class="ml-3 mr-3" @click="redirectLogin">Login</span>
    </template>

    <template style="padding-left: 10px" v-else-if="userInfo !== ''">
      <OptionList hover>
        <span class="ml-3 mr-3">
          <div class="flex-shrink-0">
            <div class="rounded-full ring-gray-100 overflow-hidden shaodw-lg w-9">
              <img class="avatar-img" :src="userInfo.avatar" alt="" />
            </div>
          </div>
        </span>
        <OptionListBlock>
          <OptionListItem @click="openUserProfile">Profile</OptionListItem>
          <OptionListItem @click="handleLogout">Logout</OptionListItem>
        </OptionListBlock>
      </OptionList>
    </template>

    <span class="ob-drop-shadow" data-dia="light-switch">
      <ThemeSwitch/>
    </span>
  </div>
</template>

<script lang="ts">
import  { defineComponent, toRef } from 'vue'
import { useRouter } from 'vue-router'

import ThemeSwitch from "./ControlButton/ThemeSwitch.vue"
import OptionList from "./OptionList/OptionList.vue"
import OptionListBlock from "./OptionList/OptionListBlock.vue"
import OptionListItem from "./OptionList/OptionListItem.vue"
import SearchModel from "./Model/SearchModel.vue"

import { useUserStore } from "@/stores/user"
import { useSearchStore } from "@/stores/search"

import { ElNotification } from 'element-plus'


export default defineComponent({
  name: 'Controls',
  components: {
    ThemeSwitch, OptionList, OptionListBlock, OptionListItem, SearchModel
  },
  setup() {
    const userStore = useUserStore()
    const searchStore = useSearchStore()
    const router = useRouter()

    const handleSearchModel: any = (status: boolean) => {
      searchStore.setOpenModel(status)
    }

    const redirectLogin = () => {
      router.push({ path: '/authentication' })
    }

    const handleLogout = () => {
      userStore.userInfo = ''
      userStore.token = ''
      sessionStorage.removeItem('token')

      ElNotification({
        title: 'Success',
        message: 'Successfully logout',
        type: 'success',
        duration: 1500
      })
    }

    const openUserProfile = () => {
      console.log('profile')
    }

    return {
      userInfo: toRef(userStore.$state, 'userInfo'),
      handleSearchModel,
      redirectLogin,
      handleLogout,
      openUserProfile
    }
  }
})
</script>

<style lang="scss">
.my-el-button {
  width: 300px !important;
}

.el-button {
  width: 300px;
}

.el-dialog__headerbtn {
  outline: none !important;
}

.el-input-group__append {
  background-color: var(--background-primary-alt) !important;
}

.el-form-item__label {
  text-align: left;
  width: 70px;
  color: var(--text-normal) !important;
}

.el-input__inner {
  color: var(--text-normal) !important;
  background-color: var(--background-primary-alt) !important;
}

.el-input__wrapper {
  background: var(--background-primary-alt) !important;
}
</style>

<style lang="scss" scoped>
.text {
  color: var(--text-normal);
  cursor: pointer;
}

#submit-button {
  outline: none;
  background: #0fb6d6;
}

.header-controls {
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    cursor: pointer;
    transition: opacity 250ms ease;
    padding-right: 0.5rem;

    &[no-hover-effect] {
      &:hover {
        opacity: 1;
      }
    }

    &:hover {
      opacity: 0.5;
    }

    .svg-icon {
      stroke: #fff;
      height: 2rem;
      width: 2rem;
      margin-right: 0.5rem;
      pointer-events: none;
    }
  }

  .search-bar {
    @apply bg-transparent flex flex-row px-0 mr-2 rounded-full;
    opacity: 0;
    width: 0;
    transition: 300ms all ease-out;

    &.active {
      @apply bg-ob-deep-800;
      opacity: 0.95;
      width: 200px;
      imput {
        width: initial;
      }
    }

    &:focus {
      appearance: none;
      outline: none;
    }

    input {
      @apply flex flex-1 bg-transparent text-ob-normal px-6 box-border;
      width: 0;
      appearance: none;
      outline: none;
    }

    svg {
      @apply float-right;
    }
  }
}

.avatar-img {
  transition-duration: 800ms;
}

.avatar-img:hover {
  transform: rotate(30deg);
}
</style>
