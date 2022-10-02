<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <form class="form-widget" @submit.prevent="updateProfile">
    <AvatarPic v-model="avatar_path" @upload="updateProfile" />
    <div>
      <label for="email">Email</label>
      <input id="email" type="text" :value="user.email" disabled />
    </div>
    <div>
      <label for="username">Name</label>
      <input id="username" v-model="username" type="text" />
    </div>
    <div>
      <label for="website">Website</label>
      <input id="website" v-model="website" type="website" />
    </div>

    <div>
      <input
        type="submit"
        class="button primary block"
        :value="loading ? 'Loading ...' : 'Update'"
        :disabled="loading" />
    </div>

    <div>
      <button class="button block" :disabled="loading" @click="signOut">
        Sign Out
      </button>
    </div>
  </form>
</template>

<script setup>
  const supabase = useSupabaseClient()

  const loading = ref(true)
  const username = ref('')
  const website = ref('')
  // eslint-disable-next-line camelcase
  const avatar_path = ref('')

  loading.value = true
  const user = useUser()
  // eslint-disable-next-line prefer-const
  let { data } = await supabase
    .from('profiles')
    .select(`username, website, avatar_url`)
    .eq('id', user.value.id)
    .single()
  if (data) {
    username.value = data.username
    website.value = data.website
    // eslint-disable-next-line camelcase
    avatar_path.value = data.avatar_url
  }
  loading.value = false

  async function updateProfile() {
    try {
      loading.value = true
      const user = useUser()
      const updates = {
        id: user.value.id,
        username: username.value,
        website: website.value,
        // eslint-disable-next-line camelcase
        avatar_url: avatar_path.value,
        updated_at: new Date(),
      }
      // eslint-disable-next-line prefer-const
      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })
      if (error) throw error
    } catch (error) {
      alert('account.vue updateProfile() catch', error.message)
    } finally {
      loading.value = false
    }
  }

  async function signOut() {
    try {
      loading.value = true
      // eslint-disable-next-line prefer-const
      let { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      alert('account.vue signOut() catch', error.message)
    } finally {
      loading.value = false
    }
  }
</script>
