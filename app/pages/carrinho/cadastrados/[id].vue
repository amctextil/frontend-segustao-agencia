<template>
  <NuxtLayout name="main">
    <h1 class="mx-16 align-self-center">Produtos no carrinho</h1>

    <div
      class="px-16 ga-16 flex-fill align-start d-flex flex-row align-self-center overflow-hidden"
      style="max-width: 1366px"
    >
      <ul class="ga-4 d-flex flex-column overflow-auto h-100 pb-16">
        <CartProductItem
          v-for="item in cartData.produtos"
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
              {{ WDFormatters.formatCurrency(cartData.total) }}
            </span>
          </div>
        </v-card>

        <v-btn prepend-icon="mdi-check" color="info" @click="shareCart">
          Compartilhar carrinho
        </v-btn>

        <v-input
          messages="Link do carrinho"
          prepend-icon="mdi-content-paste"
          @click:prepend="copyText"
        >
          {{ cartData.link }}
        </v-input>
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

const route = useRoute();
const cartId = route.params.id as string;

const { brand } = useConfigStore();

const messages = ref<SnackbarMessage[]>([]);

const cartData = await CartService.get(brand.appId, Number(cartId));

if (!cartData) {
  throw createError({
    statusCode: 500,
    statusMessage: 'Carrinho não encontrado',
  });
}

const shareCart = async () => {
  try {
    await navigator.share({
      title: cartData.nome,
      text: SHARE_MESSAGE,
      url: cartData.link,
    });
  } catch (err) {
    if (import.meta.dev) {
      console.log('🚀 ~ shareCart ~ err:', err);
    }

    messages.value.push(
      'Não foi possível compartilhar, tente em outro navegador',
    );
  }
};

const copyText = async () => {
  try {
    await navigator.clipboard.writeText(cartData.link);
    messages.value.push({
      text: 'Link copiado!',
      color: 'success',
    });
  } catch (err) {
    if (import.meta.dev) {
      console.log('🚀 ~ copyText ~ err:', err);
    }

    messages.value.push('Não foi possível copiar o link do carrinho');
  }
};
</script>

<style></style>
