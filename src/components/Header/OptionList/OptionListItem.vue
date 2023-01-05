<template>
  <div class="block cursor-pointer hover:bg-ob-trans my-1 px-4 py-1 font-medium text-ob-bright">
    <slot/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'


export default defineComponent({
  name: 'OptionListItem'
})
</script>
