<template>
  <v-btn
    v-if="item.Color || item.ImagePath"
    variant="text"
    class="rounded-circle border-current color-button"
    :border="isSelected"
    stacked
    size="48"
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
  <v-btn
    v-else
    :active="isSelected"
    active-color="black"
    @click="emit('click')"
  >
    {{ item.Text }}
  </v-btn>
</template>

<script lang="ts" setup>
import type { SCNOptionValue } from '~~/shared/interfaces/SCNProductProps';

const item = defineModel<SCNOptionValue>({ required: true });
const { isSelected } = defineProps<{ isSelected: boolean }>();
const emit = defineEmits(['click']);
</script>

<style>
.color-button {
  margin: 0;
  padding: 0;
}
</style>
