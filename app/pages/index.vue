<script setup lang="ts">
import { ProductService } from '~/services/product.service';

const { user } = useUserSession();

const list = ref(
  await ProductService.getByList(user.value!.appId, 1, 'roupas/'),
);
const categories = await ProductService.getCategories(user.value!.appId);

const filterModal = ref(false);
const selectedCategory = ref('');
const isLoading = ref(false);

const clear = () => {
  selectedCategory.value = '';
  filter();
};

const filter = async () => {
  isLoading.value = true;
  try {
    list.value = await ProductService.getByList(
      user.value!.appId,
      1,
      'roupas/' + selectedCategory.value,
    );
    filterModal.value = false;
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <NuxtLayout name="main">
    <div class="d-flex flex-column px-4 ga-4 ma-0 align-start overflow-hidden">
      <v-btn @click="filterModal = !filterModal">Filtros</v-btn>

      <v-navigation-drawer
        v-model="filterModal"
        temporary
        :persistent="isLoading"
      >
        <template #prepend>
          <v-list>
            <v-list-item title="Selecionar Categoria" />
          </v-list>
          <v-divider />
        </template>

        <v-list>
          <v-list-item
            v-for="category in categories"
            :key="category.id"
            :title="category.categoria"
            :active="selectedCategory === category.url"
            @click="isLoading ? undefined : (selectedCategory = category.url)"
          />
        </v-list>

        <template #append>
          <v-divider />

          <div class="d-flex flex-column ga-4 pa-2">
            <v-btn :loading="isLoading" variant="text" @click="clear"
              >Limpar</v-btn
            >
            <v-btn :loading="isLoading" @click="filter">Buscar</v-btn>
          </div>
        </template>
      </v-navigation-drawer>

      <ul class="d-flex flex-row pa-0 ga-4 flex-wrap ma-0 overflow-auto">
        <NuxtLink
          v-for="item in list.Products"
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
