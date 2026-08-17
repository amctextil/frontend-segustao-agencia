<template>
  <v-select
    v-model="brand"
    return-object
    prepend-inner-icon="mdi-store-outline"
    :items="DropDownList"
    class="mx-4"
    density="compact"
    hide-details
    min-width="200"
  />
</template>

<script lang="ts" setup>
const configStore = useConfigStore();

const brand = useState('brand-input', () =>
  configStore.brand
    ? {
        title: configStore.brand.nome,
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

const DropDownList = configStore.brandList.map(({ appId, nome }) => ({
  title: nome,
  value: appId,
}));
</script>

<style></style>
