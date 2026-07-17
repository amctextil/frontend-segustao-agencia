<script setup lang="ts">
import { ProductService } from '~/services/product.service';

const { user } = useUserSession();

const list = await ProductService.getByList(user.value!.appId, 1, 'roupas');
</script>

<template>
  <NuxtLayout name="main">
    <ul class="d-flex flex-row pa-4 ga-4 flex-wrap ma-0 overflow-auto">
      <NuxtLink
        v-for="item in list.Products"
        :key="item.ProductID"
        :to="`/produto${item.Url}`"
        class="text-decoration-none text-black"
      >
        <ProductGridItem :model-value="item" class="flex-fill" />
      </NuxtLink>
    </ul>
  </NuxtLayout>
</template>
