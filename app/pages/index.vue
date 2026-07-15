<script setup lang="ts">
import { ProductService } from '~/services/product.service';

const { user } = useUserSession();

const list = await ProductService.getByList(user.value!.appId, 1, 'roupas');
</script>

<template>
  <NuxtLayout name="main">
    <ul class="d-flex flex-row pa-4 ga-4 flex-wrap ma-0 overflow-auto">
      <ProductGridItem
        v-for="item in list.Products"
        :key="item.ProductID"
        :model-value="item"
        class="flex-fill"
      />
    </ul>
  </NuxtLayout>
</template>
