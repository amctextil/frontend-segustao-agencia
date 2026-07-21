<template>
  <NuxtLayout name="main">
    <div v-if="!cartStore.items.length">
      <h1>Carrinho vazio!</h1>
    </div>
    <div v-for="item in cartStore.items" v-else>
      <NuxtImg :src="brand?.data?.imageURL + item.MediaPath" />
      <span>
        {{ item.Name }}
      </span>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
const cartStore = useCartStore();
const { brand } = useConfigStore();
console.log('🚀 ~ brand:', brand);
</script>

<style></style>
