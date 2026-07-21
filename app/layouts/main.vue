<template>
  <v-app>
    <v-navigation-drawer permanent :rail="!isNavMenuExpanded">
      <v-list v-if="!!user">
        <v-list-item
          :prepend-avatar="'/img/user.png'"
          :subtitle="user.id || 'Mais informações do usuário aqui'"
          :title="WDStrings.extractFormattedName(user.nome || '')"
          :active="false"
        />
      </v-list>

      <v-divider />

      <v-list nav>
        <v-list-item
          v-for="item in NAV_ITEMS"
          :key="item.path"
          :active="route.path === item.path"
          :prepend-icon="item.icon"
          :title="item.name"
          :to="item.path"
          link
        >
          <template #append>
            <v-badge
              v-if="item.badge"
              color="info"
              :content="item.badge"
              inline
            />
          </template>
        </v-list-item>
      </v-list>

      <template #append>
        <v-list>
          <v-divider />
          <v-list-item
            prepend-icon="mdi-logout"
            title="Sair"
            @click="logoutDialog = true"
          />
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-app-bar
      :style="`background-color: ${configStore.colors.background} !important; color: ${configStore.colors.text} !important;`"
      elevation="1"
    >
      <v-app-bar-nav-icon
        class="d-none d-md-block"
        @click="isNavMenuExpanded = !isNavMenuExpanded"
      />

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

          <v-btn @click="$router.push('/carrinho')">
            <v-badge
              location="top right"
              color="primary"
              :content="cartStore.items.length"
            >
              <v-icon icon="mdi-cart"></v-icon>
            </v-badge>
          </v-btn>
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
import { WDStrings } from 'widelab-utils';
import { SITEMAP } from '~~/shared/constants/config';

const { user, clear: clearSession } = useUserSession();
const configStore = useConfigStore();
const route = useRoute();
const cartStore = useCartStore();

const logoutDialog = ref(false);

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

const isNavMenuExpanded = useState('isNavMenuExpanded', () => false);

const NAV_ITEMS = [
  { path: '/', name: 'Início', icon: 'mdi-home' },
  {
    path: '/carrinho',
    name: 'Carrinho atual',
    icon: 'mdi-cart',
    badge: cartStore.items.length,
  },
  {
    path: '/carrinho/cadastrados',
    name: 'Meus carrinhos',
    icon: 'mdi-format-list-text',
  },
];

if (['desenvolvimento', 'admin'].includes(user.value?.role || '')) {
  NAV_ITEMS.push({
    path: '/usuarios',
    name: 'Módulos',
    icon: 'mdi-account-multiple',
  });
}
</script>

<style></style>
