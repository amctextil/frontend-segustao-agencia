<script setup lang="ts">
const configStore = useConfigStore();
</script>

<template>
  <v-app id="login-layout">
    <div
      class="d-flex h-screen w-screen flex-column flex-md-row overflow-hidden bg-grey-lighten-5"
    >
      <div
        class="d-none d-md-flex w-50 align-center justify-center"
        :style="`background-color: ${configStore.colors.background} !important;`"
      >
        <NuxtImg
          v-if="configStore.selectedBrand?.imagemAppLogin"
          :src="configStore.selectedBrand?.imagemAppLogin"
          width="300"
        />
        <AMCLogo v-else :fill="configStore.colors.text" width="300" />
      </div>

      <div class="d-flex w-50 align-center justify-center">
        <slot />
      </div>
    </div>
  </v-app>
</template>
