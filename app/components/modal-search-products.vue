<template>
  <v-bottom-sheet v-model="isActive">
    <v-sheet>
      <h1>Producar produtos</h1>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script lang="ts" setup>
const isActive = defineModel<boolean>();
</script>

<style></style>
