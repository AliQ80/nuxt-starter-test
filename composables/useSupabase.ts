import type { User } from '@supabase/gotrue-js'
import { useSupabaseUserStore } from '~~/stores/userSupaStore'

export const useAuth = () => {
  const { $supabase } = useNuxtApp()
  const user = useState<User | null>('user')

  $supabase.auth.onAuthStateChange((event: string) => {
    if (event === 'SIGNED_IN') {
      user.value = $supabase.auth.user()
    }

    if (event === 'SIGNED_OUT') {
      user.value = null
    }
  })
}

export const emailLogin = async (value: {
  email: string
  password: string
}) => {
  const userStore = useSupabaseUserStore()
  const client = useSupabaseClient()

  try {
    const { user, error } = await client.auth.signIn({
      email: value.email,
      password: value.password,
    })
    if (user) {
      const { data } = await client
        .from('profiles')
        .select('username,id')
        .eq('id', user.id)
        .single()

      userStore.uid = data.id
      userStore.name = data.username
      userStore.email = user.email
      userStore.error = ''
      if (user.confirmed_at) {
        userStore.confirmed = true
      }
    }
    if (error) throw error
  } catch (error) {
    userStore.name = ''
    userStore.email = ''
    userStore.error = error.message
    userStore.confirmed = false
  }
}

export const emailRegister = async (value: {
  email: string
  password: string
}) => {
  const userStore = useSupabaseUserStore()
  const client = useSupabaseClient()
  try {
    const { user, error } = await client.auth.signUp({
      email: value.email,
      password: value.password,
    })
    if (user) {
      if (user.confirmed_at) {
        userStore.email = user.email
        userStore.error = ''
        userStore.confirmed = true
      }
      if (user.confirmation_sent_at) {
        userStore.email = user.email
        userStore.error = ''
        userStore.confirmed = false
        // navigateTo('/verify')
      }
    }
    if (error) throw error
  } catch (error) {
    userStore.email = ''
    userStore.name = ''
    userStore.error = error.message
    userStore.confirmed = false
  }
}

export const providerLogin = async (
  provider: 'github' | 'google' | 'apple' | 'discord',
) => {
  const userStore = useSupabaseUserStore()
  const client = useSupabaseClient()

  try {
    const { user, error } = await client.auth.signIn({ provider })
    if (user) {
      const { data } = await client
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single()

      userStore.name = data.username
      userStore.email = user.email
      userStore.error = ''

      if (user.role === 'authenticated') {
        userStore.confirmed = true
      }
    }
    if (error) throw error
  } catch (error) {
    userStore.email = ''
    userStore.name = ''
    userStore.error = error.message
    userStore.confirmed = false
  }
}

export const logout = async () => {
  const client = useSupabaseClient()
  const userStore = useSupabaseUserStore()

  userStore.email = ''
  userStore.name = ''
  userStore.confirmed = false
  userStore.error = ''

  await client.auth.signOut()
}
