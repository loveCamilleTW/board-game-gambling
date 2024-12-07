// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      googleClientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
    },
  },
  build: {
    transpile: ['vuetify'],
  },
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.css',
  ],
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
})
