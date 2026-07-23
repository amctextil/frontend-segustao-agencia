<template>
  <NuxtLayout name="main">
    <h1>{{ cartData?.nome }}</h1>
    <h1>
      {{
        cartData?.criadoEm
          ? WDDates.toString(new Date(cartData.criadoEm), 'BR', true)
          : ''
      }}
    </h1>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { WDDates } from 'widelab-utils';
import { CartService } from '~/services/cart.service';

const route = useRoute();

const { user } = useUserSession();
const { brand } = useConfigStore();

const cartId = route.params.id as string;

const cartData = await CartService.get(
  user.value!.appId,
  user.value!.id,
  Number(cartId),
);
</script>

<style></style>
