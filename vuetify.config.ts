import { defineVuetifyConfiguration } from 'vuetify-nuxt-module/custom-configuration';
// import * as components from 'vuetify/components';
// import * as directives from 'vuetify/directives';
// import { fa } from 'vuetify/iconsets/fa';
// import { aliases, mdi } from 'vuetify/iconsets/mdi';
import { pt } from 'vuetify/locale';

export default defineVuetifyConfiguration({
  ssr: true,
  // components: {
  //   ...components,
  // },
  // directives,
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          'brand-blue': '#003c72',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    // aliases,
    // sets: {
    //   mdi,
    //   fa,
    // },
  },
  locale: {
    locale: 'pt',
    messages: { pt },
  },
});
