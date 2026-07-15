<script setup lang="ts">
import { ProductService } from '~/services/product.service';

const { user, clear: clearSession } = useUserSession();

async function logout() {
  await clearSession();
  await navigateTo('/login');
}

if (!user.value) {
  throw createError({
    statusCode: 401,
    statusMessage: 'Realize o login para continuar',
  });
}

const list = await ProductService.getByList(user.value.appId, 1, 'roupas');
</script>

<template>
  <NuxtLayout name="main">
    <div>
      <h1>Welcome {{ user?.nome }}</h1>
      <button @click="logout">Logout</button>

      {{ list.Products.map((item) => item.Name) }}
    </div>
  </NuxtLayout>
</template>
