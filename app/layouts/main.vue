<template>
  <v-app>
    <v-app-bar
      :style="`background-color: ${configStore.colors.background} !important; color: ${configStore.colors.text} !important;`"
      elevation="1"
    >
      <template #prepend>
        <v-btn
          v-if="!isHomePage"
          icon="mdi-arrow-left"
          :color="configStore.colors.text"
          @click="$router.back"
        />
      </template>

      <v-app-bar-title v-if="pageTitle">
        {{ pageTitle }}
      </v-app-bar-title>
      <v-app-bar-title v-else>
        Bem-vindo
        {{ (user?.nome || '').split(' ')[0] }}
      </v-app-bar-title>

      <template #append>
        <v-row class="align-center">
          <v-app-bar-title class="mx-4">{{
            configStore.brandName || ''
          }}</v-app-bar-title>

          <v-btn icon="mdi-shopping" />

          <v-btn icon="mdi-logout" @click="logout" />
        </v-row>
      </template>
    </v-app-bar>

    <v-main
      class="d-flex flex-column overflow-hidden h-screen bg-grey-lighten-5"
    >
      <slot />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { SITEMAP } from '~~/shared/constants/config';

const { user, clear: clearSession } = useUserSession();
const configStore = useConfigStore();
const route = useRoute();

const isHomePage = route.path.matchAll(/\//g).toArray().length <= 1;

const routePath = route.path
  .replace(/(produto)\/(.+)/g, '$1/id')
  .replace(/\d+/g, 'id');

const pageTitle = SITEMAP[routePath];

if (pageTitle) {
  useHead({ title: pageTitle });
}

async function logout() {
  await clearSession();
  await navigateTo('/login');
}
</script>

<style></style>
