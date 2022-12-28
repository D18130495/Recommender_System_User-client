<template>
  <nav class="items-center flex-1 hidden lg:flex">
    <ul class="flex flex-row list-none px-6 text-white">
      <li
        class="not-italic font-medium text-xs h-full relative flex flex-col items-center justify-center cursor-pointer text-center py-4 px-2"
        v-for="route in routes"
        :key="route.path">
        <div
          class="nav-link text-sm block px-1.5 py-0.5 rounded-md relative cursor-pointer"
          @click="pushPage(route.path)"
          v-if="route.children && route.children.length === 0"
          :data-menu="route.name">
          <span class="relative z-50">{{ route.name }}</span>
        </div>
      </li>

    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRef, toRefs } from 'vue'
import { useRouter } from 'vue-router'

import menu from '@/menu/menu'


export default defineComponent({
  name: 'Navigation',
  components: {
  },
  setup() {
    const router = useRouter()

    const pushPage = (path: string): void => {
      if (!path) return
    }

    const reactiveData = reactive({
      albums: [] as any
    })

    onMounted(() => {
    })

    const openPhotoAlbum = (id: any): void => {
      router.push('/photos/' + id)
    }

    return {
      ...toRefs(reactiveData),
      routes: menu.routes,
      pushPage,
      openPhotoAlbum
    }
  }
})
</script>

<style lang="scss" scoped>
.nav-link {
  @apply hover:text-ob-bright;
  &:hover {
    &:before {
      @apply opacity-60;
    }
  }

  &:before {
    @apply absolute rounded-lg opacity-0 transition bg-ob-deep-800 z-40;
    content: '';
    top: -4px;
    left: -4px;
    width: calc(100% + 8px);
    height: calc(100% + 8px);
  }
}
</style>
