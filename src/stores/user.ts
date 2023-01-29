import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      userInfo: '' as any,
      token: '' as any,
      drawer: false
    }
  },
  persist: {
    storage: window.sessionStorage
  }
})
