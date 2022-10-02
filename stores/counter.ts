import { defineStore, acceptHMRUpdate } from 'pinia'

export const useStore = defineStore('storeId', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      counter: 12,
      name: 'Eduardo',
      isAdmin: true,
    }
  },
  actions: {
    hit() {
      this.counter++
    },
  },

  getters: {
    getCount: (state) => state.counter,
    getUser: (state) => {
      return state.name
    },
  },
  persist: true,
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}
