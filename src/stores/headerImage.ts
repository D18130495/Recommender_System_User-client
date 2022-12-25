import { defineStore } from 'pinia'

export const useHeaderImageStore = defineStore('headerImageStore', {
  state: () => {
    return {
      isMobile: false,
      headerImage: ''
    }
  },
  actions: {
    changeMobileState(isMobile: boolean) {
      this.isMobile = isMobile
    },
    setHeaderImage(imageUrl: string) {
      this.headerImage = imageUrl
    },
    resetHeaderImage() {
      this.headerImage = ''
    }
  }
})
