<script setup lang="ts">
import { BRAND_LIST } from '~/constants/config';

const configStore = useConfigStore();
const { loggedIn, user, fetch: refreshSession } = useUserSession();

const credentials = reactive({
  email: '',
  password: '',
  brand: configStore.selectedBrand ? configStore.selectedBrand.appId : '',
});
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
  label: title,
  value: value as string,
}));
</script>

<template>
  <NuxtLayout name="login">
    <div
      class="m-8 md:w-2/3 flex flex-col items-center justify-center gap-8 text-gray-700"
    >
      <h1 class="self-start text-2xl font-semibold">Login</h1>

      <form
        class="w-full flex flex-col gap-8 text-gray-800"
        @submit.prevent="login"
      >
        <UFormField label="Marca" name="brand">
          <USelect
            v-model="credentials.brand"
            class="w-full"
            :items="DropDownList"
          />
        </UFormField>

        <UFormField label="Email" name="email">
          <UInput v-model="credentials.email" class="w-full" />
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput
            v-model="credentials.password"
            type="password"
            class="w-full"
          />
        </UFormField>

        <UButton type="submit" color="success"> Entrar </UButton>
      </form>
    </div>
  </NuxtLayout>
</template>
