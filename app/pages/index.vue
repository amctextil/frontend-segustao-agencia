<script setup lang="ts">
import { ProductService } from '~/services/product.service';

const configStore = useConfigStore();

if (!configStore.brand.appId) {
  throw createError({
    status: 400,
    message: 'Marca não selecionada',
  });
}

const list = ref(
  await ProductService.getByList(configStore.brand.appId, 1, 'roupas/'),
);
const isLoading = ref(false);
const isLoadingMore = ref(false);
const productsContainer = ref<HTMLElement>();
const loadMoreTrigger = ref<HTMLElement>();
const currentCategory = ref('');
const currentPage = ref(1);
let intersectionObserver: IntersectionObserver | undefined;

const loadNextPage = async () => {
  if (
    isLoadingMore.value ||
    !list.value?.HasNextPage ||
    !configStore.brand.appId
  ) {
    return;
  }

  isLoadingMore.value = true;

  try {
    const nextPage = currentPage.value + 1;
    const nextList = await ProductService.getByList(
      configStore.brand.appId,
      nextPage,
      'roupas/' + currentCategory.value,
    );

    if (nextList) {
      list.value = {
        ...nextList,
        Products: [...(list.value.Products ?? []), ...nextList.Products],
      };
      currentPage.value = nextPage;
    }
  } finally {
    isLoadingMore.value = false;
  }
};

const searchProducts = async ({
  category,
  resolve,
}: {
  category: string;
  resolve: (value?: undefined) => void;
}) => {
  isLoading.value = true;

  try {
    if (!configStore.brand.appId) {
      throw createError({
        status: 400,
        message: 'Marca não selecionada',
      });
    }

    const nextList = await ProductService.getByList(
      configStore.brand.appId,
      1,
      'roupas/' + category,
    );

    list.value = nextList;
    currentCategory.value = category;
    currentPage.value = 1;

    resolve();
  } finally {
    isLoading.value = false;
  }
};

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

      list.value = await ProductService.getByList(appId, 1, 'roupas/');
      currentCategory.value = '';
      currentPage.value = 1;
    } catch {
      list.value = undefined;
    } finally {
      isLoading.value = false;
    }
  },
);

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

const observeLoadMoreTrigger = () => {
  if (loadMoreTrigger.value) {
    intersectionObserver?.observe(loadMoreTrigger.value);
  }
};

watch(loadMoreTrigger, observeLoadMoreTrigger);

onBeforeUnmount(() => intersectionObserver?.disconnect());
</script>

<template>
  <NuxtLayout name="main">
    <div
      class="d-flex flex-column px-4 ga-4 ma-0 pt-2 align-start overflow-hidden"
    >
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
      <div
        v-else
        ref="productsContainer"
        class="flex-grow-1 w-100 min-h-0 overflow-auto"
      >
        <ul class="d-flex flex-row pa-0 ga-4 flex-wrap ma-0">
          <NuxtLink
            v-for="item in list?.Products"
            :key="item.ProductID"
            :to="`/produto${item.Url}`"
            class="text-decoration-none text-black"
          >
            <ProductGridItem :model-value="item" class="flex-fill" />
          </NuxtLink>
        </ul>
        <div
          v-if="list.HasNextPage"
          ref="loadMoreTrigger"
          class="d-flex justify-center w-100 pa-4"
          aria-hidden="true"
        >
          <v-progress-circular
            v-if="isLoadingMore"
            indeterminate
            class="ma-4"
          />
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
