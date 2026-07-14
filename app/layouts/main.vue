<template>
  <v-app>
    <v-app-bar
      :style="`background-color: ${configStore.colors.background} !important; color: ${configStore.colors.text} !important;`"
      elevation="1"
    >
      <v-app-bar-title v-if="SITEMAP[$route.path.replace(/\d+/g, 'id')]">
        {{ SITEMAP[$route.path.replace(/\d+/g, 'id')] }}
      </v-app-bar-title>
      <v-app-bar-title v-else-if="!!user">
        Bem-vindo
        {{ (user?.name || '').split(' ')[0] }}
      </v-app-bar-title>
      <v-app-bar-title v-else>Bem-vindo </v-app-bar-title>

      <template #append>
        <v-row class="align-center">
          <v-app-bar-title class="mx-4">{{
            configStore.brandName || ''
          }}</v-app-bar-title>

          <v-btn icon="mdi-shopping" />
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
import { SITEMAP } from '~/constants/config';

const { user } = useUserSession();
const configStore = useConfigStore();
</script>

<style></style>
