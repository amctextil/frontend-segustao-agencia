<template>
  <v-select
    v-model="brand"
    return-object
    prepend-inner-icon="mdi-store-outline"
    :items="DropDownList"
    :disabled="configStore.isLoadingBrand"
    class="mx-4"
    density="compact"
    hide-details
    min-width="200"
  />
</template>

<script lang="ts" setup>
import { BRAND_LIST } from '~~/shared/constants/config';
import type { Brand } from '~~/shared/interfaces/AppConfigProps';

const configStore = useConfigStore();

const brand = useState('brand-input', () =>
  configStore.brand
    ? {
        title: configStore.brand.name,
        value: configStore.brand.appId,
      }
    : {
        title: '',
        value: '' as const,
      },
);

watch(
  () => brand.value,
  async (newBrand) => {
    if (newBrand.value) {
      await configStore.selectbrand(newBrand.value);
    }
  },
);

const DropDownList = BRAND_LIST.map(({ title, value }) => ({
  title: title as string,
  value: value as '' | Brand['value'],
}));
</script>

<style></style>
