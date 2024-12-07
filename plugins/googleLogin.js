export default defineNuxtPlugin((nuxtApp) => {
  // Make sure this plugin only runs on client side
  if (import.meta.server) return

  const runtimeConfig = useRuntimeConfig()
  const { googleClientId: GOOGLE_CLIENT_ID } = runtimeConfig.public

  // Dynamically import vue3-google-login only on client side
  import('vue3-google-login').then((module) => {
    const vue3GoogleLogin = module.default
    nuxtApp.vueApp.use(vue3GoogleLogin, {
      clientId: GOOGLE_CLIENT_ID
    })
  })
})