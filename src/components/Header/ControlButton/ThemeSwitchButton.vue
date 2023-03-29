<template>
  <div class="button" @click="changeStatus">
    <div class="slider"
      :style="{
        transform: switchStyle.transform,
        backgroundColor: switchStyle.background
      }">
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, toRefs} from 'vue'


export default defineComponent({
  name: 'ThemeSwitchButton',
  props: ['status'],
  emits: ['changeStatus'],
  setup(props, { emit }) {
    let { status } = toRefs(props)

    onMounted(() => {
      changeTransform()
    })

    let switchStyle = reactive({
      transform: '',
      background: '#6e40c9'
    })

    let buttonStatus = status.value

    const changeStatus = () => {
      buttonStatus = !buttonStatus
      changeTransform()
      emit('changeStatus', buttonStatus)
    }

    const changeTransform = () => {
      const transform = buttonStatus ? '18px' : '0'

      switchStyle.transform = `translateX(${transform})`
      switchStyle.background = buttonStatus ? '#6e40c9' : '#100E16'
    }

    return {
      changeStatus,
      switchStyle
    }
  }
})
</script>

<style lang="scss" scoped>
.button {
  @apply relative;
  width: 40px;
  height: 22px;
  background-color: var(--background-primary);
  border-radius: 24px;
  border: 3px solid rgba(110, 64, 201, 0.35);
  box-sizing: border-box;
  transition: background-color 250ms ease;
}

.slider {
  top: -6px;
  left: -6px;
  width: 28px;
  height: 28px;
  background-color: #6e40c9;
  border-radius: 50%;
  transition: all 250ms cubic-bezier(0.4, 0.03, 0, 1) 0s;
  @apply absolute shadow-lg;
}
</style>
