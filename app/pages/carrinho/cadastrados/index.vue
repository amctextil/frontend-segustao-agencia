<template>
  <NuxtLayout name="main">
    <div class="d-flex flex-row flex-wrap ga-4 pa-4 overflow-auto">
      <v-card
        v-for="cart in cartList"
        :key="cart.id"
        width="250"
        :subtitle="WDDates.toString(new Date(cart.criadoEm), 'BR', true)"
        :to="`/carrinho/cadastrados/${cart.id}`"
        rounded="lg"
      >
        <template #title>
          <v-card-title class="text-wrap">{{ cart.nome }}</v-card-title>
        </template>

        <div class="d-flex flex-column align-center pa-2">
          <NuxtImg
            :src="(brand?.data?.imageURL || '') + cart.produtos[0]?.MediaPath"
            style="aspect-ratio: 0.73; object-fit: cover"
            class="w-100 rounded-lg"
          />
        </div>

        <v-list-item
          append-icon="mdi-share"
          title="Compartilhar"
          :to="`/carrinho/cadastrados/${cart.id}?compartilhar=1`"
        />
      </v-card>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { WDDates } from 'widelab-utils';
import { CartService } from '~/services/cart.service';

const { user } = useUserSession();
const { brand } = useConfigStore();

const cartList = await CartService.list(user.value!.appId, user.value!.id);

cartList.sort((a, b) => b.criadoEm.localeCompare(a.criadoEm));
</script>

<style></style>
