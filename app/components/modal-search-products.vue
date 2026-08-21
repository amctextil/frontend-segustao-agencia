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

        <ul
          ref="productsContainer"
          class="d-flex flex-row pa-4 pt-0 ga-4 flex-wrap ma-0 overflow-auto"
        >
          <NuxtLink
            v-for="item in data?.Products"
            :key="item.ProductID"
            :to="`/produto${item.Url}`"
            class="text-decoration-none text-black"
          >
            <ProductGridItem :model-value="item" class="flex-fill" />
          </NuxtLink>

          <h2 v-if="!data?.Products.length && status === 'success'">
            Nenhum produto encontrado
          </h2>

          <li
            v-if="data?.HasNextPage"
            ref="loadMoreTrigger"
            class="d-flex justify-center w-100 pa-4"
            aria-hidden="true"
          >
            <v-progress-circular v-if="isLoadingMore" indeterminate />
          </li>
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
const isLoadingMore = ref(false);
const currentPage = ref(1);
const productsContainer = ref<HTMLElement>();
const loadMoreTrigger = ref<HTMLElement>();
let timeoutId: NodeJS.Timeout;
let intersectionObserver: IntersectionObserver | undefined;

const configStore = useConfigStore();

const brandAppId = computed(() => configStore.brand?.appId);

const loadNextPage = async () => {
  if (
    isLoadingMore.value ||
    status.value === 'pending' ||
    !data.value?.HasNextPage ||
    !brandAppId.value
  ) {
    return;
  }

  isLoadingMore.value = true;

  try {
    const nextPage = currentPage.value + 1;
    let nextList;

    if (!debouncedQuery.value) {
      nextList = await ProductService.getByList(
        brandAppId.value,
        nextPage,
        'roupas',
      );
    } else {
      const response = await ProductService.getBySearch(
        debouncedQuery.value,
        brandAppId.value,
        nextPage,
      );
      nextList = response.data;
    }

    if (nextList && data.value) {
      data.value = {
        ...nextList,
        Products: [...(data.value.Products ?? []), ...nextList.Products],
      };
      currentPage.value = nextPage;
    }
  } finally {
    isLoadingMore.value = false;
  }
};

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

watch([debouncedQuery, brandAppId], () => {
  currentPage.value = 1;
});

const { data, status } = await useAsyncData(
  `search-results-${brandAppId.value}-${debouncedQuery.value}`,
  async () => {
    if (!brandAppId.value) {
      throw createError({
        status: 400,
        message: 'Marca não selecionada',
      });
    }

    if (!debouncedQuery.value) {
      return await ProductService.getByList(brandAppId.value, 1, 'roupas');
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

const observeLoadMoreTrigger = () => {
  if (loadMoreTrigger.value) {
    intersectionObserver?.observe(loadMoreTrigger.value);
  }
};

onMounted(() => {
  intersectionObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        void loadNextPage();
      }
    },
    { root: productsContainer.value, threshold: 0.1 },
  );

  observeLoadMoreTrigger();
});

watch(loadMoreTrigger, observeLoadMoreTrigger);

onBeforeUnmount(() => intersectionObserver?.disconnect());
</script>

<style></style>
