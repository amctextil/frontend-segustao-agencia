<template>
  <NuxtLayout name="main">
    <h1>detalhes do produto</h1>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ProductService } from '~/services/product.service';

const route = useRoute();
const { user } = useUserSession();

const productUrl = route.params.url as string;

const product = await ProductService.getProductByUrl(
  productUrl,
  user.value!.appId,
);
console.log('🚀 ~ product:', product);
</script>

<style></style>
