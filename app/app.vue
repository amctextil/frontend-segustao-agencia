<script setup>
const titleTemplate = '%s | AMC';
const title = 'Sugestão da Agência';
const description =
  'Aplicativo para criação de carrinhos sugeridos pela Agência da AMC Têxtil para os clientes da AMC.';

useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: {
    lang: 'pt-BR',
  },
  titleTemplate,
});

useSeoMeta({
  title,
  titleTemplate,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: '/ogImage.png',
  twitterCard: 'summary_large_image',
});
</script>

<template>
  <NuxtLoadingIndicator />

  <NuxtLayout>
    <v-app>
      <NuxtPage />
    </v-app>
  </NuxtLayout>
</template>
