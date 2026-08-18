<template>
  <NuxtLayout name="main" :admin="true">
    <v-card
      class="ma-4 overflow-hidden d-flex flex-column align-self-center flex-fill"
      width="760"
    >
      <v-text-field
        v-model="searchQuery"
        prepend-inner-icon="mdi-magnify"
        placeholder="Buscar"
        clearable
        class="px-4 pt-4 flex-0-0"
      />

      <div class="overflow-auto flex-fill">
        <v-list-item
          v-for="item in filteredUsers"
          :key="item.id"
          lines="two"
          :title="WDStrings.uppercaseFirst(item.nome, true)"
          :subtitle="item.urlSite"
          :to="`/marcas/${item.appId}`"
          append-icon="mdi-chevron-right"
        />
      </div>

      <v-card-actions>
        <v-btn
          block
          prepend-icon="mdi-account-plus"
          variant="tonal"
          color="primary"
          size="large"
          to="/marcas/novo"
        >
          Adicionar
        </v-btn>
      </v-card-actions>
    </v-card>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { WDStrings } from 'widelab-utils';
import { BrandService } from '../../services/brand.service';

definePageMeta({ middleware: ['admin'] });

const searchQuery = ref('');

const list = await BrandService.list();

const filteredUsers = computed(() => {
  if (!searchQuery.value) {
    return list;
  }

  return list.filter(
    (u) =>
      WDStrings.isContentMatchingSearch(u.nome, searchQuery.value) ||
      WDStrings.isContentMatchingSearch(u.urlSite, searchQuery.value),
  );
});
</script>

<style></style>
