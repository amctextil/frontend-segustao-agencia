<template>
  <v-btn
    v-if="item.Color || item.ImagePath"
    variant="text"
    class="rounded-circle border-current"
    :border="isSelected"
    stacked
    size="small"
    @click="emit('click')"
  >
    <div
      :style="{
        backgroundColor: item.Color,
        height: '40px',
        width: '40px',
      }"
      class="rounded-circle"
    />
  </v-btn>
  <div v-else>tamanmho</div>
</template>

<script lang="ts" setup>
import type { SCNOptionValue } from '~~/shared/interfaces/SCNProductProps';

const item = defineModel<SCNOptionValue>({ required: true });
const { isSelected } = defineProps<{ isSelected: boolean }>();
const emit = defineEmits(['click']);
</script>

<style></style>
