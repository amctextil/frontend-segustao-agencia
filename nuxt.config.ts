// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxt/image',
    'vuetify-nuxt-module',
  ],

  devtools: {
    enabled: true,
  },
  runtimeConfig: {
    session: {
      cookie: {
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },

  build: {
    transpile: ['vuetify'],
  },

  routeRules: {
    '/': { prerender: true },
  },

  devServer: {
    port: Number(process.env.NUXT_DEV_PORT) || 3000,
    host: process.env.NUXT_DEV_HOST || 'localhost',
  },

  compatibilityDate: '2026-06-30',

  nitro: {
    apiBaseURL: '/webapi',
  },

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
