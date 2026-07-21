<template>
  <NuxtLayout name="main">
    <div
      class="pa-4 ga-16 justify-center align-center flex-fill d-flex flex-row"
    >
      <div class="ga-4 d-flex flex-column">
        <div v-if="!cartStore.items.length">
          <h1>Carrinho vazio!</h1>
        </div>

        <div
          v-for="item in cartStore.items"
          v-else
          :key="item.ProductID"
          class="d-flex flex-row ga-4 overflow-auto"
        >
          <NuxtImg
            :src="brand?.data?.imageURL + item.MediaPath"
            width="120"
            style="aspect-ratio: 0.73; object-fit: cover"
          />

          <div class="d-flex flex-column ga-2">
            <span>
              {{ item.Name }}
            </span>

            <span
              v-for="option in item.SKUOptions"
              :key="option.Alias"
              class="text-grey"
            >
              {{ option.Alias }}: {{ option.Title }}
            </span>

            <div class="text-grey d-flex ga-2">
              <span
                v-if="item.PromotionPrice"
                class="text-decoration-line-through"
              >
                {{ WDFormatters.formatCurrency(item.ListPrice) }}
              </span>

              <span class="font-weight-bold text-grey-darken-1">
                {{
                  WDFormatters.formatCurrency(
                    item.PromotionPrice || item.ListPrice,
                  )
                }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="ga-4 d-flex flex-column">
        <span>{{ WDFormatters.formatCurrency(cartStore.totalPrice) }}</span>
        <v-btn>Finalizar carrinho</v-btn>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { WDFormatters } from 'widelab-utils';

const cartStore = useCartStore();
const { brand } = useConfigStore();
console.log('🚀 ~ brand:', brand);
</script>

<style></style>
