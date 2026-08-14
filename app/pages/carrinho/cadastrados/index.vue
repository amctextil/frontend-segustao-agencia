<template>
  <NuxtLayout name="main">
    <div
      v-if="isLoading"
      class="d-flex flex-row flex-wrap ga-4 pa-4 overflow-hidden"
    >
      <v-skeleton-loader v-for="n in 40" :key="n" width="250" height="200" />
    </div>
    <div v-else-if="!list.length" class="pa-4">
      <h2>Não há nenhum carrinho cadastrado para esta marca</h2>
    </div>
    <div v-else class="d-flex flex-row flex-wrap ga-4 pa-4 overflow-auto">
      <v-card
        v-for="cart in list"
        :key="cart.id"
        width="250"
        :subtitle="WDDates.toString(new Date(cart.criadoEm), 'BR', true)"
        :to="`/carrinho/cadastrados/${cart.id}`"
        rounded="lg"
      >
        <template #title>
          <v-card-title class="text-wrap">{{ cart.nome }}</v-card-title>
        </template>

        <v-list-item
          density="comfortable"
          prepend-icon="mdi-cash"
          :title="WDFormatters.formatCurrency(cart.total || 0)"
        />
        <v-list-item
          density="comfortable"
          prepend-icon="mdi-package-variant-closed"
          :title="`${cart.produtos.length} ${WDStrings.pluralizeWord('produto', 'produtos', cart.produtos.length)}`"
        />
        <v-list-item
          density="comfortable"
          prepend-icon="mdi-store-outline"
          :title="`Colcci`"
        />
        <v-list-item
          density="comfortable"
          prepend-icon="mdi-identifier"
          :title="'#' + cart.id"
        />
      </v-card>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { WDDates, WDFormatters, WDStrings } from 'widelab-utils';
import { CartService } from '~/services/cart.service';

const configStore = useConfigStore();

const list = ref(await CartService.list(configStore.brand.appId));
const isLoading = ref(false);

list.value.sort((a, b) => b.criadoEm.localeCompare(a.criadoEm));

watch(
  () => configStore.brand.appId,
  async (appId) => {
    isLoading.value = true;

    try {
      list.value = await CartService.list(appId);
    } catch {
      list.value = [];
    } finally {
      isLoading.value = false;
    }
  },
);
</script>

<style></style>
