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
      <cart-item-card v-for="cart in list" :key="cart.id" :model-value="cart" />
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { CartService } from '~/services/cart.service';

const configStore = useConfigStore();

if (!configStore.brand) {
  throw createError({
    status: 400,
    message: 'Marca não selecionada',
  });
}

const list = ref(await CartService.list(configStore.brand.appId));
const isLoading = ref(false);

list.value.sort((a, b) => b.criadoEm.localeCompare(a.criadoEm));

watch(
  () => configStore.brand?.appId,
  async (appId) => {
    isLoading.value = true;

    try {
      if (!appId) {
        throw createError({
          status: 400,
          message: 'Marca não selecionada',
        });
      }

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
