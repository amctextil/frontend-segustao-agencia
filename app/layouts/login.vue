<script setup lang="ts">
import { WDColors } from 'widelab-utils';

const configStore = useConfigStore();
</script>

<template>
  <div
    class="flex h-screen w-screen flex-col md:flex-row overflow-hidden bg-slate-50"
  >
    <div
      class="hidden md:flex w-1/2 items-center justify-center"
      :style="`background-color: ${configStore.selectedBrand?.corApp} !important;`"
    >
      <NuxtImg
        v-if="configStore.selectedBrand?.imagemAppLogin"
        :src="configStore.selectedBrand?.imagemAppLogin"
        width="300"
      />
      <AMCLogo
        v-else
        :fill="
          WDColors.getContrastingTextColor(
            configStore.selectedBrand?.corApp || '#FFFFFF',
          )
        "
        width="300"
      />
    </div>

    <div class="flex w-1/2 items-center justify-center">
      <slot />
    </div>
  </div>
</template>
