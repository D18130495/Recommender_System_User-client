<template>
  <div
    class="ob-dropdown relative z-50"
    @mouseover="hoverHandler"
    @mouseleave="leaveHandler">
    <slot/>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, reactive, toRefs } from 'vue'


export default defineComponent({
  name: 'OptionList',
  props: {
    hover: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const mouseHover = toRefs(props).hover

    let isActive: { active: boolean } = reactive({
      active: false
    })

    provide('isActive', isActive)

    const hoverHandler = () => {
      if(mouseHover.value) isActive.active = true
    }

    const leaveHandler = () => {
      if(mouseHover.value) {
        isActive.active = false
      }
    }

    return {
      hoverHandler,
      leaveHandler
    }
  }
})
</script>
