<template>
  <NuxtLayout name="main" :admin="true">
    <v-card
      class="ma-4 overflow-hidden d-flex flex-column align-self-center flex-fill"
      width="760"
    >
      <v-text-field
        v-model="searchQuery"
        prepend-inner-icon="mdi-magnify"
        placeholder="Buscar por nome ou email"
        clearable
        class="px-4 pt-4 flex-0-0"
      />

      <div class="overflow-auto flex-fill">
        <v-list-item
          v-for="item in filteredUsers"
          :key="item.id"
          lines="two"
          :title="WDStrings.uppercaseFirst(item.nome, true)"
          :subtitle="item.email"
          :to="`/usuarios/${item.id}`"
          append-icon="mdi-chevron-right"
        >
          <template #prepend>
            <v-avatar
              color="grey-lighten-4"
              class="mr-2"
              :text="WDStrings.getInitials(item.nome)"
            />
          </template>

          <v-list-item-subtitle>
            {{ getUserProfileName(item.tipoUsuario) }}
          </v-list-item-subtitle>
        </v-list-item>
      </div>

      <v-card-actions>
        <v-btn
          block
          prepend-icon="mdi-account-plus"
          variant="tonal"
          color="primary"
          size="large"
          to="/usuarios/novo"
        >
          Adicionar
        </v-btn>
      </v-card-actions>
    </v-card>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { WDStrings } from 'widelab-utils';
import { UserService } from '~/services/user.service';
import { getUserProfileName } from '~~/shared/enums/UserProfile';

definePageMeta({ middleware: ['03-admin'] });

const list = await UserService.list();
const searchQuery = ref('');

const filteredUsers = computed(() => {
  if (!searchQuery.value) {
    return list;
  }

  return list.filter(
    (u) =>
      WDStrings.isContentMatchingSearch(u.nome, searchQuery.value) ||
      WDStrings.isContentMatchingSearch(u.email, searchQuery.value),
  );
});
</script>

<style></style>
