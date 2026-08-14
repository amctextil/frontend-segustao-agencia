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

      <ul
        v-if="isLoading"
        class="d-flex flex-row pa-0 ga-4 flex-wrap ma-0 overflow-hidden"
      >
        <v-skeleton-loader v-for="n in 40" :key="n" width="200" height="300" />
      </ul>
      <div v-else-if="!list?.Products.length" class="pa-4">
        <h2>nenhum produto cadastrado</h2>
      </div>
      <ul v-else class="d-flex flex-row pa-0 ga-4 flex-wrap ma-0 overflow-auto">
        <NuxtLink
          v-for="item in list?.Products"
          :key="item.ProductID"
          :to="`/produto${item.Url}`"
          class="text-decoration-none text-black"
        >
          <ProductGridItem :model-value="item" class="flex-fill" />
        </NuxtLink>
      </ul>
    </div>
  </NuxtLayout>
</template>
