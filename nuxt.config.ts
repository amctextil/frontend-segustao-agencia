// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    'nuxt-auth-utils',
    '@pinia/nuxt',
    '@nuxt/image',
    'vuetify-nuxt-module',
  ],

  devtools: {
    enabled: true,
  },

  build: {
    transpile: ['vuetify'],
  },

  routeRules: {
    '/': { prerender: true },
  },

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs',
      },
    },
  },

  vuetify: {
    moduleOptions: {/* module specific options */},
    vuetifyOptions: './vuetify.config.ts', // <== you can omit it
  },
});
