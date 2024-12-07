// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
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
