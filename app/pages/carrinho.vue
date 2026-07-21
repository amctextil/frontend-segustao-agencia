<template>
  <NuxtLayout name="main">
    <h1 class="mx-16 align-self-center">Produtos no carrinho</h1>

    <div
      class="px-16 ga-16 flex-fill align-start d-flex flex-row align-self-center overflow-hidden"
      style="max-width: 1366px"
    >
      <ul class="ga-4 d-flex flex-column overflow-auto h-100 pb-16">
        <div v-if="!cartStore.items.length">
          <h1>Carrinho vazio!</h1>
        </div>

        <CartProductItem
          v-for="item in cartStore.items"
          v-else
          :key="item.ProductID"
          :model-value="item"
        />
      </ul>

      <div class="d-flex flex-column ga-8">
        <v-card
          style="min-width: 320px"
          title="Subtotal"
          append-icon="mdi-cash-multiple"
          variant="tonal"
        >
          <div class="ga-8 pa-4 d-flex flex-column">
            <span class="text-title-large">
              {{ WDFormatters.formatCurrency(cartStore.totalPrice) }}
            </span>
          </div>
        </v-card>

        <v-btn prepend-icon="mdi-check" color="success">
          Finalizar carrinho
        </v-btn>

        <v-btn prepend-icon="mdi-plus" variant="outlined" to="/">
          Incluir mais produtos
        </v-btn>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { WDFormatters } from 'widelab-utils';

const cartStore = useCartStore();
const { brand } = useConfigStore();
</script>

<style></style>
