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

          <v-btn>
            <v-badge
              location="top right"
              color="primary"
              :content="cartStore.items.length"
            >
              <v-icon icon="mdi-cart"></v-icon>
            </v-badge>
          </v-btn>
          <v-btn icon="mdi-logout" @click="logoutDialog = true" />
        </v-row>
      </template>
    </v-app-bar>

    <v-main
      class="d-flex flex-column overflow-hidden h-screen bg-grey-lighten-5"
    >
      <slot />
    </v-main>

    <v-dialog v-model="logoutDialog" max-width="500">
      <v-card title="Deseja realmente sair?">
        <v-card-actions>
          <v-btn text="Ficar" @click="logoutDialog = false" />
          <v-btn text="Sair" color="red" @click="logout" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script lang="ts" setup>
import { SITEMAP } from '~~/shared/constants/config';

const { user, clear: clearSession } = useUserSession();
const configStore = useConfigStore();
const route = useRoute();
const cartStore = useCartStore();

const logoutDialog = ref(false);
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
