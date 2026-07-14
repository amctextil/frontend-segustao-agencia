<script setup lang="ts">
import { BRAND_LIST } from '~/constants/config';

const configStore = useConfigStore();
const { loggedIn, user, fetch: refreshSession } = useUserSession();

const credentials = reactive({
  email: '',
  password: '',
  brand: configStore.selectedBrand
    ? {
        title: configStore.selectedBrand.name,
        value: configStore.selectedBrand.appId,
      }
    : {
        title: '',
        value: '',
      },
});

const errorMessage = ref('');
const isLoading = ref(false);

async function login() {
  try {
    await $fetch('/api/login', {
      method: 'POST',
      body: credentials,
    });

    // Refresh the session on client-side and redirect to the home page
    await refreshSession();
    await navigateTo('/');
  } catch {
    alert('Bad credentials');
  }
}

const DropDownList = BRAND_LIST.map(({ title, value }) => ({
  title: title as string,
  value: value as string,
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
          v-model="credentials.brand"
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
