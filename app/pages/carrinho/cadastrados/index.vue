<template>
  <NuxtLayout name="main">
    <div class="d-flex flex-row flex-wrap ga-4 pa-4 overflow-auto">
      <v-card
        v-for="cart in cartList"
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

const { brand } = useConfigStore();

const cartList = await CartService.list(brand.appId);

cartList.sort((a, b) => b.criadoEm.localeCompare(a.criadoEm));
</script>

<style></style>
