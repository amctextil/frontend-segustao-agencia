<template>
  <NuxtLayout name="main" :admin="true">
    <v-card
      class="ma-4 overflow-hidden d-flex flex-column align-self-center flex-fill"
      width="760"
    >
      <v-text-field
        v-model="searchQuery"
        prepend-inner-icon="mdi-magnify"
        placeholder="Buscar"
        clearable
        class="px-4 pt-4 flex-0-0"
      />

      <div class="overflow-auto flex-fill"></div>
    </v-card>
  </NuxtLayout>
</template>

<script lang="ts" setup>
definePageMeta({ middleware: ['admin'] });

const searchQuery = ref('');
</script>

<style></style>
