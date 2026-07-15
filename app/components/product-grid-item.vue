<template>
  <div>{{ item?.Name }}</div>
</template>

<script lang="ts" setup>
import type { SCNProductProps } from '~~/shared/interfaces/SCNProductProps';

const item = defineModel<SCNProductProps>();
</script>

<style></style>
