<template>
  <NuxtLayout name="main">
    <h1 class="mx-16 mt-0 align-self-center">Produtos no carrinho</h1>

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

        <v-btn
          v-if="cartStore.items.length"
          prepend-icon="mdi-check"
          color="success"
          @click="createCart"
        >
          Finalizar carrinho
        </v-btn>

        <v-btn prepend-icon="mdi-plus" variant="outlined" to="/">
          Incluir mais produtos
        </v-btn>
      </div>
    </div>

    <v-snackbar-queue
      v-model="messages"
      timeout="2000"
      color="error"
      location="bottom"
    />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { SnackbarMessage } from 'vuetify/lib/components/VSnackbarQueue/VSnackbarQueue.mjs';
import { WDFormatters } from 'widelab-utils';
import { CartService } from '~/services/cart.service';

const cartStore = useCartStore();
const config = useConfigStore();

if (!config.brand?.data) {
  throw createError({
    statusCode: 500,
    statusMessage: 'Marca não selecionada',
  });
}

const messages = ref<SnackbarMessage[]>([]);
const cartName = ref('');

const createCart = () => {
  const products = cartStore.items.map((item) => ({
    ref: item.productParent.IntegrationID,
    productid: item.productParent.ProductID.toString(),
    name: item.Name,
    skuid: item.ProductID.toString(),
    quantity: 1, // item.Quantity,
    urlimagem: config.brand!.data!.imageURL + item.MediaPath,
  }));

  CartService.createLink(config.brand.appId, products, cartName.value);
};
</script>

<style></style>
