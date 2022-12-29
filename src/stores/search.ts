import { defineStore } from 'pinia'

export const useSearchStore = defineStore('searchStore', {
  state: () => ({
    openModel: false
  }),
  getters: {},
  actions: {
    setOpenModel(status: boolean) {
      this.openModel = status

      if(status) {
        document.body.classList.add('model--active')
      }else {
        document.body.classList.remove('model--active')
        document.getElementById('App-Container')?.focus()
      }
    }
  }
})
