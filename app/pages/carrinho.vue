<template>
  <NuxtLayout name="main">
    <div v-if="!cartStore.items.length">
      <h1>Carrinho vazio!</h1>
    </div>
    <div v-for="item in cartStore.items" v-else>{{ item.Name }}</div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
const cartStore = useCartStore();
</script>

<style></style>
