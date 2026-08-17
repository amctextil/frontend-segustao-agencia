<template>
  <li class="d-flex flex-row ga-8 align-center">
    <NuxtImg
      :src="brand?.urlImagens + model.urlImagem"
      width="120"
      style="aspect-ratio: 0.73; object-fit: cover"
    />

    <div class="d-flex flex-column ga-2 flex-fill">
      <span>
        {{ model.nome }}
      </span>

      <span class="text-grey"> Tamanho: {{ model.tamanho }} </span>
      <span class="text-grey"> Cor: {{ model.cor }} </span>
    </div>

    <div
      class="text-grey d-flex flex-column ga-2 text-title-medium"
      style="min-width: 80px"
    >
      <span v-if="model.precoPromocional" class="text-decoration-line-through">
        {{ WDFormatters.formatCurrency(model.preco) }}
      </span>

      <span class="font-weight-bold text-grey-darken-2">
        {{ WDFormatters.formatCurrency(model.precoPromocional || model.preco) }}
      </span>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { WDFormatters } from 'widelab-utils';
import type { NewCartItem } from '~~/shared/interfaces/CartProps';

const { brand } = useConfigStore();

const model = defineModel<NewCartItem>({ required: true });
</script>

<style></style>
