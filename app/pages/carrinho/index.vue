<template>
  <NuxtLayout name="main">
    <div v-if="isLoading" class="align-center justify-center d-flex flex-fill">
      <v-progress-circular indeterminate size="100" />
    </div>
    <div v-else class="d-flex flex-column px-16 pt-4">
      <v-text-field v-model="cartName" label="Nome do carrinho" />

      <h2 class="mx-16 mt-0">Produtos no carrinho</h2>

      <div
        class="px-16 ga-16 flex-fill align-start d-flex flex-row align-self-center overflow-hidden"
        style="max-width: 1366px"
      >
        <ul class="ga-4 d-flex flex-column overflow-auto h-100 pb-16">
          <h2 v-if="!cartStore.items.length">Carrinho vazio!</h2>

          <CartProductItem
            v-for="item in cartStore.items"
            v-else
            :key="item.produtoId"
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
                {{ WDFormatters.formatCurrency(cartStore.totalPrice || 0) }}
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
const router = useRouter();

if (!config.brand) {
  throw createError({
    statusCode: 500,
    statusMessage: 'Marca não selecionada',
  });
}

const messages = ref<SnackbarMessage[]>([]);
const cartName = ref('');
const isLoading = ref(false);

const createCart = async () => {
  const cartCreated = await CartService.createLink(
    config.brand.appId,
    cartStore.items,
    cartName.value,
  );

  router.push(`/carrinho/cadastrados/${cartCreated.id}`);
  cartStore.clearCart();
};
</script>

<style></style>
