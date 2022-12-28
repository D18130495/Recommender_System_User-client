import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      userInfo: '123' as any,
      token: '' as any,
    }
  },
  actions: {},
  persist: {
    storage: window.sessionStorage
  }
})
