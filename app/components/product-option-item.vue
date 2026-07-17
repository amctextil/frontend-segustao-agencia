<template>
  <div v-if="item.Color || item.ImagePath">
    <div
      :style="{ border: isSelected ? '2px solid #000000' : null }"
      class="rounded-circle pa-1"
    >
      <div
        :style="{
          backgroundColor: item.Color,
          width: '40px',
          height: '40px',
        }"
        class="rounded-circle"
      />
    </div>
  </div>
  <div v-else>tamanmho</div>
</template>

<script lang="ts" setup>
import type { SCNOptionValue } from '~~/shared/interfaces/SCNProductProps';

const item = defineModel<SCNOptionValue>({ required: true });
const { isSelected } = defineProps<{ isSelected: boolean }>();
</script>

<style></style>
