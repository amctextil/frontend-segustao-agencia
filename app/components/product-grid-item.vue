<template>
  <li class="d-flex flex-column" style="width: 200px; max-width: 250px">
    <v-hover v-slot="{ props: hoverProps, isHovering }">
      <NuxtImg
        v-bind="hoverProps"
        :src="
          'https://d3vnyi5j6ba1mc.cloudfront.net' + item.BrowsingImage.MediaPath
        "
        style="aspect-ratio: 0.73; object-fit: cover"
        :class="isHovering ? 'opacity-70' : 'opacity-100'"
      />

      <span>
        {{ item.Name }}
      </span>

      <div class="text-grey d-flex ga-2">
        <span v-if="item.PromotionPrice" class="text-decoration-line-through">
          {{ WDFormatters.formatCurrency(item.ListPrice) }}
        </span>

        <span class="font-weight-bold">
          {{
            item.PromotionPrice
              ? WDFormatters.formatCurrency(item.PromotionPrice)
              : WDFormatters.formatCurrency(item.ListPrice)
          }}
        </span>
      </div>
    </v-hover>
  </li>
</template>

<script lang="ts" setup>
import { WDFormatters } from 'widelab-utils';
import type { SCNProductProps } from '~~/shared/interfaces/SCNProductProps';

const item = defineModel<SCNProductProps>({ required: true });
</script>

<style></style>
