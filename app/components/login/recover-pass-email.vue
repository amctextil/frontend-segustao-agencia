<template>
  <v-form
    ref="form"
    class="w-100 d-flex flex-column ga-4 text-grey-darken-4"
    @submit.prevent="sendCode"
  >
    <v-select
      v-model="brand"
      label="Selecione uma marca"
      return-object
      prepend-inner-icon="mdi-flag-outline"
      :items="DropDownList"
      :disabled="configStore.isLoadingBrand"
    />

    <v-text-field
      v-model="email"
      label="E-mail"
      prepend-inner-icon="mdi-email-outline"
      type="email"
      :disabled="configStore.isLoadingBrand"
    />

    <v-btn
      :loading="isLoading"
      :disabled="configStore.isLoadingBrand"
      type="submit"
    >
      Receber código
    </v-btn>
  </v-form>
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

const DropDownList = BRAND_LIST.map(({ title, value }) => ({
  title: title as string,
  value: value as '' | Brand['value'],
}));

const email = ref('');

const { isLoading } = defineProps<{ isLoading: boolean }>();
const emit = defineEmits<{
  submit: [emailS: string, brandS: Brand['value']];
}>();

watch(
  () => brand.value,
  async (newBrand) => {
    if (newBrand.value) {
      await configStore.selectbrand(newBrand.value);
    }
  },
);

const sendCode = () => {
  if (!brand.value.value) {
    throw new Error('Nenhuma marca selecionada');
  }

  emit('submit', email.value, brand.value.value);
};
</script>

<style></style>
