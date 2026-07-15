<script setup lang="ts">
import { BRAND_LIST } from '~/constants/config';
import type { Brand } from '~~/shared/interfaces/AppConfigProps';

const configStore = useConfigStore();
const { fetch: refreshSession } = useUserSession();

const brand = ref(
  configStore.selectedBrand
    ? {
        title: configStore.selectedBrand.name,
        value: configStore.selectedBrand.appId,
      }
    : {
        title: '',
        value: '' as const,
      },
);

const credentials = reactive({
  email: '',
  password: '',
});

const errorMessage = ref('');
const isLoading = ref(false);
const passShow = ref(false);

watch(
  () => brand.value,
  async (newBrand) => {
    if (newBrand.value) {
      await configStore.selectbrand(newBrand.value);
    }
  },
);

async function login() {
  try {
    errorMessage.value = '';
    isLoading.value = true;

    await $fetch('/api/login', {
      method: 'POST',
      body: { ...credentials, appId: brand.value.value },
    });

    // Refresh the session on client-side and redirect to the home page
    await refreshSession();
    await navigateTo('/');
  } catch (error) {
    if (import.meta.dev) {
      console.log('🚀 ~ login ~ error:', error);
    }

    errorMessage.value = 'Erro ao fazer login';
  } finally {
    isLoading.value = false;
  }
}

const DropDownList = BRAND_LIST.map(({ title, value }) => ({
  title: title as string,
  value: value as '' | Brand['value'],
}));
</script>

<template>
  <NuxtLayout name="login">
    <div
      class="ma-8 w-md-66 d-flex flex-column align-center justify-center ga-8 text-grey-darken-3"
    >
      <h1 class="align-self-start text-h4">Login</h1>

      <v-form
        ref="form"
        class="w-100 d-flex flex-column ga-4 text-grey-darken-4"
        @submit.prevent="login"
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
          v-model="credentials.email"
          label="E-mail"
          prepend-inner-icon="mdi-email-outline"
          type="email"
          :disabled="configStore.isLoadingBrand"
        />

        <ClientOnly>
          <v-text-field
            v-model="credentials.password"
            label="Senha"
            counter
            prepend-inner-icon="mdi-key-outline"
            :append-inner-icon="passShow ? 'mdi-eye' : 'mdi-eye-off'"
            :type="passShow ? 'text' : 'password'"
            :disabled="configStore.isLoadingBrand"
            @click:append-inner="passShow = !passShow"
          />

          <template #fallback>
            <v-text-field
              label="Senha"
              prepend-inner-icon="mdi-key-outline"
              append-inner-icon="mdi-eye-off"
              type="password"
              :disabled="configStore.isLoadingBrand"
              :loading="true"
            />
          </template>
        </ClientOnly>

        <v-btn
          :loading="isLoading"
          :disabled="configStore.isLoadingBrand"
          type="submit"
        >
          Entrar
        </v-btn>

        <strong class="text-center text-red-darken-1"
          >{{ errorMessage }}&nbsp;</strong
        >
      </v-form>
    </div>
  </NuxtLayout>
</template>
