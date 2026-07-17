<template>
  <v-btn
    v-if="item.Color || item.ImagePath"
    variant="text"
    class="rounded-circle border-current color-button"
    :border="isSelected"
    stacked
    size="48"
    :disabled="disabled"
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
    <v-icon
      v-if="disabled"
      icon="mdi-close"
      color="red-darken-1"
      class="position-absolute icon-pos"
    />
  </v-btn>
  <v-btn
    v-else
    :active="isSelected"
    active-color="black"
    :disabled="disabled"
    @click="emit('click')"
  >
    {{ item.Text }}
    <v-icon
      v-if="disabled"
      icon="mdi-close"
      color="red-darken-1"
      class="position-absolute icon-pos"
    />
  </v-btn>
</template>

<script lang="ts" setup>
import type { SCNOptionValue } from '~~/shared/interfaces/SCNProductProps';

const item = defineModel<SCNOptionValue>({ required: true });
const { isSelected, disabled } = defineProps<{
  isSelected: boolean;
  disabled: boolean;
}>();
const emit = defineEmits(['click']);
</script>

<style>
.color-button {
  margin: 0;
  padding: 0;
}
.icon-pos {
  right: -10px;
  top: -10px;
}
</style>
