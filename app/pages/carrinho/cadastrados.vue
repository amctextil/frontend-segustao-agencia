<template>
  <NuxtLayout name="main">
    <div>
      <li v-for="cart in cartList">{{ cart.id }} {{ cart.total }}</li>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { CartService } from '~/services/cart.service';

const { user } = useUserSession();

const cartList = await CartService.list(user.value!.appId, user.value!.id);
</script>

<style></style>
