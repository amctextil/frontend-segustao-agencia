<script setup lang="ts">
import { ProductService } from '~/services/product.service';

const { user } = useUserSession();

const list = await ProductService.getByList(user.value!.appId, 1, 'roupas');
</script>

<template>
  <NuxtLayout name="main">
    <div>
      <ProductGridItem
        v-for="item in list.Products"
        :key="item.ProductID"
        :model-value="item"
      />
    </div>
  </NuxtLayout>
</template>
