import { defineStore, acceptHMRUpdate } from 'pinia'

export const useSupabaseUserStore = defineStore('userSupaStore', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      uid: '',
      email: '',
      name: '',
      confirmed: false,
      error: '',
      authModalOpen: false,
    }
  },

  getters: {
    getUid: (state) => state.uid,
    getEmail: (state) => state.email,
    getName: (state) => state.name,
    getConfirmed: (state) => state.confirmed,
    getError: (state) => state.error,
    getAuthModal: (state) => state.authModalOpen,
  },

  actions: {
    authModalOff() {
      this.authModalOpen = false
    },
    authModalOn() {
      this.authModalOpen = true
    },

    reset() {
      this.uid = ''
      this.email = ''
      this.name = ''
      this.confirmed = false
      this.error = ''
      this.authModalOpen = false
    },

    setStore(
      uid: string,
      email: string,
      name: string,
      auth: boolean,
      error: string,
    ) {
      this.uid = uid
      this.email = email
      this.name = name
      this.confirmed = auth
      this.error = error
    },
  },

  persist: true,
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSupabaseUserStore, import.meta.hot))
}
