export default defineNuxtPlugin((nuxtApp) => {
  const supabase = useSupabaseClient()
  nuxtApp.provide('supabase', supabase)
  useState('user', () => supabase.auth.user())
})
