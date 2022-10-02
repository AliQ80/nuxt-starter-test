import { defineStore, acceptHMRUpdate } from 'pinia'

export const useFirebaseUserStore = defineStore('userStore', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      user: {},
      email: '',
      name: '',
      error: '',
      success: false,
    }
  },
  actions: {},

  getters: {},

  persist: true,
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFirebaseUserStore, import.meta.hot))
}
