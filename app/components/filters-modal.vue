<template>
  <v-row>
    <v-btn @click="filterModal = !filterModal">Filtros</v-btn>

    <v-chip v-if="!!selectedCategory" closable @click:close="clear">
      {{
        categories?.find((item) => item.url === selectedCategory)?.categoria ||
        selectedCategory
      }}
    </v-chip>
  </v-row>

  <v-navigation-drawer v-model="filterModal" temporary :persistent="isLoading">
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
        <v-btn :loading="isLoading" variant="text" @click="clear">Limpar</v-btn>
        <v-btn :loading="isLoading" @click="filter">Buscar</v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { ProductService } from '~/services/product.service';

const configStore = useConfigStore();

if (!configStore.brand) {
  throw createError({
    statusCode: 400,
    status: 400,
    statusMessage: 'Marca não selecionada',
  });
}

const categories = ref(
  await ProductService.getCategories(configStore.brand.appId),
);

watch(
  () => configStore.brand?.appId,
  async () => {
    if (!configStore.brand) {
      throw createError({
        statusCode: 400,
        status: 400,
        statusMessage: 'Marca não selecionada',
      });
    }

    categories.value = await ProductService.getCategories(
      configStore.brand.appId,
    );
    clear();
  },
);

const emit = defineEmits<{
  (
    event: 'search',
    payload: { category: string; resolve: (value: undefined) => void },
  ): Promise<void>;
}>();

const selectedCategory = ref('');
const isLoading = ref(false);
const filterModal = ref(false);

const clear = () => {
  selectedCategory.value = '';
  filter();
};

const filter = async () => {
  isLoading.value = true;
  try {
    const category = selectedCategory.value.replace(/\/?roupas\/?/g, '');

    await new Promise((resolve) => {
      emit('search', { category, resolve });
    });

    filterModal.value = false;
  } finally {
    isLoading.value = false;
  }
};
</script>

<style></style>
