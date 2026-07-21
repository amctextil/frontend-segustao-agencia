<template>
  <li class="d-flex flex-row ga-8 align-center">
    <NuxtImg
      :src="brand?.data?.imageURL + model.MediaPath"
      width="120"
      style="aspect-ratio: 0.73; object-fit: cover"
    />

    <div class="d-flex flex-column ga-2 flex-fill">
      <span>
        {{ model.Name }}
      </span>

      <span
        v-for="option in model.SKUOptions"
        :key="option.Alias"
        class="text-grey"
      >
        {{ option.Alias }}: {{ option.Title }}
      </span>
    </div>

    <div
      class="text-grey d-flex flex-column ga-2 text-title-medium"
      style="min-width: 80px"
    >
      <span v-if="model.PromotionPrice" class="text-decoration-line-through">
        {{ WDFormatters.formatCurrency(model.ListPrice) }}
      </span>

      <span class="font-weight-bold text-grey-darken-2">
        {{
          WDFormatters.formatCurrency(model.PromotionPrice || model.ListPrice)
        }}
      </span>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { WDFormatters } from 'widelab-utils';
import type { SCNCartItemProps } from '~~/shared/interfaces/SCNCartItemProps';

const { brand } = useConfigStore();

const model = defineModel<SCNCartItemProps>({ required: true });
</script>

<style></style>
