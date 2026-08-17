<template>
  <v-card
    :key="cart.id"
    width="250"
    :subtitle="WDDates.toString(new Date(cart.criadoEm), 'BR', true)"
    :to="`/carrinho/cadastrados/${cart.id}`"
    rounded="lg"
  >
    <template #title>
      <v-card-title class="text-wrap">{{ cart.nome || '---' }}</v-card-title>
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
      :title="brand?.nome || cart.appId"
    />
    <v-list-item
      density="comfortable"
      prepend-icon="mdi-identifier"
      :title="'#' + cart.id"
    />
  </v-card>
</template>

<script lang="ts" setup>
import { WDDates, WDFormatters, WDStrings } from 'widelab-utils';
import type { CartProps } from '~~/shared/interfaces/CartProps';

const configStore = useConfigStore();

const cart = defineModel<CartProps>({ required: true });
const brand = configStore.brandList.find(
  (item) => item.appId === cart.value.appId,
);
</script>

<style></style>
