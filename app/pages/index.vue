<script setup lang="ts">
import { ProductService } from '~/services/product.service';

const configStore = useConfigStore();

const list = ref(
  await ProductService.getByList(configStore.brand.appId, 1, 'roupas/'),
);
const isLoading = ref(false);

const searchProducts = async ({
  category,
  resolve,
}: {
  category: string;
  resolve: (value?: undefined) => void;
}) => {
  isLoading.value = true;

  try {
    list.value = await ProductService.getByList(
      configStore.brand.appId,
      1,
      'roupas/' + category,
    );

    resolve();
  } finally {
    isLoading.value = false;
  }
};

watch(
  () => configStore.brand.appId,
  async (appId) => {
    isLoading.value = true;

    try {
      list.value = await ProductService.getByList(appId, 1, 'roupas/');
    } catch {
      list.value = undefined;
    } finally {
      isLoading.value = false;
    }
  },
);
</script>

<template>
  <NuxtLayout name="main">
    <div class="d-flex flex-column px-4 ga-4 ma-0 align-start overflow-hidden">
      <filters-modal @search="searchProducts" />

      <div v-if="!list?.Products && !isLoading">
        <h1>Erro ao buscar produtos</h1>
      </div>
      <ul
        v-if="!isLoading"
        class="d-flex flex-row pa-0 ga-4 flex-wrap ma-0 overflow-auto"
      >
        <NuxtLink
          v-for="item in list?.Products"
          :key="item.ProductID"
          :to="`/produto${item.Url}`"
          class="text-decoration-none text-black"
        >
          <ProductGridItem :model-value="item" class="flex-fill" />
        </NuxtLink>
      </ul>
      <ul v-else class="d-flex flex-row pa-0 ga-4 flex-wrap ma-0 overflow-auto">
        <v-skeleton-loader v-for="n in 10" :key="n" width="200" height="300" />
      </ul>
    </div>
  </NuxtLayout>
</template>
