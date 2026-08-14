<template>
  <v-bottom-sheet v-model="isActive">
    <v-card title="Procurar produtos">
      <template #append>
        <v-btn icon="mdi-close" variant="flat" @click="isActive = false" />
      </template>

      <div class="d-flex flex-column ga-4 px-8">
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          :loading="status === 'pending'"
          autofocus
        />

        <ul class="d-flex flex-row pa-4 pt-0 ga-4 flex-wrap ma-0 overflow-auto">
          <NuxtLink
            v-for="item in data?.Products"
            :key="item.ProductID"
            :to="`/produto${item.Url}`"
            class="text-decoration-none text-black"
          >
            <ProductGridItem :model-value="item" class="flex-fill" />
          </NuxtLink>
        </ul>
      </div>
    </v-card>
  </v-bottom-sheet>
</template>

<script lang="ts" setup>
import { ProductService } from '~/services/product.service';

const isActive = defineModel<boolean>();
const search = ref('');
const debouncedQuery = ref('');
let timeoutId: NodeJS.Timeout;

const configStore = useConfigStore();
const brandAppId = computed(() => configStore.brand.appId);

watch([search], () => {
  clearTimeout(timeoutId);

  timeoutId = setTimeout(() => {
    debouncedQuery.value = search.value;
  }, 300); // 300ms delay
});

watch([isActive], () => {
  if (!isActive.value) {
    search.value = '';
  }
});

const { data, status } = await useAsyncData(
  'search-results',
  async () => {
    if (!debouncedQuery.value) {
      return await ProductService.getByList(
        brandAppId.value,
        1,
        'roupas',
      );
    }

    const { data } = await ProductService.getBySearch(
      debouncedQuery.value,
      brandAppId.value,
      1,
    );

    return data;
  },
  {
    watch: [debouncedQuery, brandAppId],
    immediate: true,
  },
);
</script>

<style></style>
