<template>
  <v-app>
    <v-navigation-drawer permanent :rail="!isNavMenuExpanded">
      <v-list v-if="!!user">
        <v-list-item
          :prepend-avatar="'/img/user.png'"
          :subtitle="user.email"
          :title="WDStrings.extractFormattedName(user.nome || '')"
          :active="false"
        />
      </v-list>

      <v-divider />

      <v-list nav>
        <v-list-item
          v-for="item in NAV_ITEMS"
          :key="item.path"
          :active="item.path === activePath"
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
      :style="`background-color: #FFFFFF !important; color: #000000 !important;`"
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

      <v-btn
        v-if="!attrs.admin"
        icon="mdi-magnify"
        @click="searchModalActive = true"
      />

      <modal-search-products v-if="!attrs.admin" v-model="searchModalActive" />

      <template v-if="!attrs.admin" #append>
        <v-row class="align-center pr-4">
          <select-brand />

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
      <v-breadcrumbs :items="uniqueRouteParts" class="ma-0" />

      <slot />
    </v-main>

    <v-dialog v-model="logoutDialog" max-width="500">
      <v-card title="Deseja realmente sair?">
        <v-card-actions>
          <v-btn text="Ficar" @click="logoutDialog = false" />
          <v-btn text="Sair" color="red" @click="handleLogout" />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script lang="ts" setup>
import { WDStrings } from 'widelab-utils';
import { SITEMAP } from '~~/shared/constants/config';
import { UserProfile } from '~~/shared/enums/UserProfile';

const { user, logout } = useAuth();
const route = useRoute();
const cartStore = useCartStore();

const searchModalActive = ref(false);
const logoutDialog = ref(false);

const uniqueRouteParts = route.path
  .split('/')
  .map(parseRouteLinks)
  .filter(
    (item, index, arr) =>
      arr.findIndex((fItem) => fItem.segment === item.segment) === index,
  );

const routePath = route.path
  .replace(/(produto)\/(.+)/g, '$1/id')
  .replace(/\d+/g, 'id');

const pageTitle = SITEMAP[routePath];

if (pageTitle) {
  useHead({ title: pageTitle });
}

async function handleLogout() {
  await logout();
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

if (user.value?.tipoUsuario === UserProfile.ADMIN) {
  NAV_ITEMS.push(
    {
      path: '/usuarios',
      name: 'Usuários',
      icon: 'mdi-account-multiple',
    },
    {
      path: '/marcas',
      name: 'Marcas',
      icon: 'mdi-store-settings',
    },
  );
}

const activePath = computed(() =>
  NAV_ITEMS.reduce((active, item) => {
    if (
      item.path.length < 2
        ? routePath === item.path
        : routePath.startsWith(item.path)
    ) {
      return item.path;
    }

    return active;
  }, ''),
);

const attrs = useAttrs();
</script>

<style>
.v-input.expanding-search {
  transition: max-width 0.5s;
}
</style>
